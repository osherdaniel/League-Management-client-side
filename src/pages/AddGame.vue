<template>
     <div align="center" justify="center" class="container">  
          <br/><br/>    
          <b-card style="max-width: 60rem;" >
               <h5 class="font-weight-light">
                    <h5 class="card-header text-muted text-center">Add New Game</h5> 
                    <br/>
                         <b-form @submit.prevent="onAdding">
                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-game_date"
                                   label-cols-sm="3"
                                   label="Game Date:"
                                   label-for="game_date">
                                   
                                        <b-form-input
                                        id="game_date"
                                        v-model="$v.form.game_date.$model"
                                        type="text"
                                        :state="validateState('game_date')"></b-form-input>
                                             <b-form-invalid-feedback v-if="!$v.form.game_date.required"> Game date field is required </b-form-invalid-feedback>
                                             <b-form-invalid-feedback else v-if="!$v.form.game_date.validate"> 
                                                  Game date need to be in date format ||
                                                  The game must be future game 
                                             </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     

                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-game_time"
                                   label-cols-sm="3"
                                   label="Game Time:"
                                   label-for="game_time">
                                   
                                        <b-form-input
                                        id="game_time"
                                        v-model="$v.form.game_time.$model"
                                        type="text"
                                        :state="validateState('game_time')"></b-form-input>
                                             <b-form-invalid-feedback v-if="!$v.form.game_time.required"> Game Time field is required </b-form-invalid-feedback>
                                             <b-form-invalid-feedback else v-if="!$v.form.game_time.validate"> Game Time need to be in the format "{0-23}:{0-60}" </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     

                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-field"
                                   label-cols-sm="3"
                                   label="Field:"
                                   label-for="field">
                                   
                                        <b-form-input
                                        id="field"
                                        v-model="$v.form.field.$model"
                                        type="text"
                                        :state="validateState('field')"></b-form-input>
                                        <b-form-invalid-feedback v-if="!$v.form.field.required"> Field is required </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     
                              
                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-referee"
                                   label-cols-sm="3"
                                   label="Referee:"
                                   label-for="referee">
                                        <b-form-select
                                        id="referee"
                                        v-model="$v.form.referee.$model"
                                        :options="referees"
                                        :state="validateState('referee')"></b-form-select>
                                        <b-form-invalid-feedback v-if="!$v.form.referee.required"> Referee is required</b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     

                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-homeTeam"
                                   label-cols-sm="3"
                                   label="Home Team:"
                                   label-for="homeTeam">
                                        <b-form-select
                                        id="homeTeam"
                                        v-model="$v.form.homeTeam.$model"
                                        :options="teams"
                                        :state="validateState('homeTeam')"></b-form-select>
                                        <b-form-invalid-feedback v-if="!$v.form.homeTeam.required"> Home Team is required</b-form-invalid-feedback>
                                   </b-form-group>
                              </small>

                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-awayTeam"
                                   label-cols-sm="3"
                                   label="Away Team:"
                                   label-for="awayTeam">
                                        <b-form-select
                                        id="awayTeam"
                                        v-model="$v.form.awayTeam.$model"
                                        :options="teams"
                                        :state="validateState('awayTeam')"></b-form-select>
                                        <b-form-invalid-feedback v-if="!$v.form.awayTeam.required"> Away Team is required</b-form-invalid-feedback>
                                        <b-form-invalid-feedback v-else-if="!$v.form.awayTeam.sameAsHome"> Away Team must to be diffrent than Home Team</b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     
                              
                              <br/><br/>

                              <center>
                              <button type="submit" class="btn btn-outline-info font-weight-light text-center">
                                   <span style="font-size:larger;"> Add Game </span>
                              </button>
                              </center>     
                         </b-form>

                         <div class="h5 font-weight-light text-muted" v-if="showSuccess">
                              <br/><br/>
                              The game has been added
                         </div>

                         <b-alert
                              class="mt-2"
                              v-if="form.submitError"
                              variant="warning"
                              dismissible
                              show>
                              Update result failed: {{ form.submitError.data }}
                    </b-alert>
               </h5>     
          </b-card>   
     </div>       
</template>

<script>
import { required, sameAs, not } from "vuelidate/lib/validators";
export default {
     name: "Login",
     data() {
          return {
               showSuccess: false,
               teams: [],
               referees: [],
               form: {
                    game_time: "",
                    game_date: "",
                    field: "",
                    referee: null,
                    homeTeam: null,
                    awayTeam: null,
                    submitError: undefined
               }
          };
     },
     validations: {
          form: {
               game_time: {
                    required, 
                    validate: (value) => { 
                         let array_time = value.split(':');
                         if(array_time.length == 2){
                              let startParts = array_time[0];
                              let endParts = array_time[1];

                              if (startParts.length == 2 && startParts >= 0 && startParts < 24){
                                   if(endParts.length == 2 && endParts >= 0 && endParts < 60)
                                       return true;
                              }
                         }
                         return false;
                    }
               },
               game_date: {
                    required,
                    validate: (value) => { 
                         let array_time = value.split('-');
          
                         if(array_time.length == 3){
                              let year = array_time[0];
                              let month = array_time[1];
                              let day = array_time[2];

                              let currentDate = new Date();
                              console.log(currentDate);
                              if (month == "12")
                                   month = "11";
                              else
                                   month = (parseInt(month) - 1).toString();     
                              let recivedData = new Date(year, month, day);
                              console.log(recivedData);

                              if (recivedData > currentDate)
                                   return true;   
                              return false;  
                         }
                         console.log("SHahar ")
                         return false;
                    }
               },
               field: {
                    required
               },
               referee: {
                    required
               },
               homeTeam: {
                    required
               },
               awayTeam: {
                    required,
                    sameAsHome: not(sameAs("homeTeam"))
               }
          }
     },
     methods: {
          validateState(param) {
               let { $dirty, $error } = this.$v.form[param];
               return $dirty ? !$error : null;
           },
          async addGame() {
               try {
                    this.axios.defaults.withCredentials = true;
                    let response = await this.axios.post(
                         "http://localhost:3000/manage_league/addGame",
                         {
                              game_time: this.form.game_time,
                              game_date: this.form.game_date,
                              refereeID: this.form.referee,
                              home_team_ID: this.form.homeTeam,
                              away_team_ID: this.form.awayTeam,
                              field: this.form.field
                         }
                    );
                    this.axios.defaults.withCredentials = false;
                    console.log(response.data);
                    if(response.data == "Game created on site")
                         this.showSuccess = true;
               }
               catch (err) {
                    console.log(err.response);
                    this.form.submitError = err.response;
               }
          },
          onAdding() {
               this.form.submitError = undefined;
               this.$v.form.$touch();
               if (this.$v.form.$anyError) 
                    return;
               this.addGame();
          },
     },

     mounted(){
          this.$root.store.referees.forEach((referee, index) => {
               let newReferee = {
                    value: referee.refereeID,
                    text:  referee.firsName + ' ' + referee.lastName
               }
               this.referees.push(newReferee);
          });
          this.$root.store.teams.forEach((teams, index) => {
               let newTeam = {
                    value: teams.teamID,
                    text:  teams.teamName
               }
               this.teams.push(newTeam);
          });
     } 
}  

</script>
<style lang="scss" scoped>
  body {
    background-image: none;
  }
</style>
