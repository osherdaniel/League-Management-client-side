<template>
     <div align="center" justify="center" style="padding-top:50px">
          <b-card style="max-width: 40rem;" >
               <div class="text-left">
                    <h5 class="font-weight-light">
                         <h5 class="card-header text-muted text-center">Add Result to Game: GameID {{ $route.params.gameID }}</h5><br/>
                         <b-form @submit.prevent="onAdding">
                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-home_result"
                                   label-cols-sm="3"
                                   label="Home Score:"
                                   label-for="home_result">
                                   
                                        <b-form-input
                                        id="home_result"
                                        v-model="$v.form.home_result.$model"
                                        type="text"
                                        :state="validateState('home_result')"></b-form-input>
                                                       <b-form-invalid-feedback v-if="!$v.form.home_result.required"> Away score field is required </b-form-invalid-feedback>
                                        <b-form-invalid-feedback else v-if="!$v.form.home_result.validate"> Away score need to be number and need to be bigger than zero </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>    

                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-away_result"
                                   label-cols-sm="3"
                                   label="Away Score:"
                                   label-for="away_result">
                                   
                                        <b-form-input
                                        id="away_result"
                                        v-model="$v.form.away_result.$model"
                                        type="text"
                                        :state="validateState('away_result')"></b-form-input>
                                        <b-form-invalid-feedback v-if="!$v.form.away_result.required"> Away score field is required </b-form-invalid-feedback>
                                        <b-form-invalid-feedback else v-if="!$v.form.away_result.validate"> Away score need to be number and need to be bigger than zero </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     
                              
                              <br/><br/>
                              <center>
                              <button type="submit" class="btn btn-outline-info font-weight-bold text-center">
                                   <span style="font-size:larger;"> Update Game Result </span>
                              </button>
                              </center>   
                         </b-form>

                         <b-alert
                              class="mt-2"
                              v-if="form.submitError"
                              variant="warning"
                              dismissible
                              show>
                              Update result failed: {{ form.submitError.data }}
                         </b-alert>
                    </h5>
               </div>
          </b-card>     
     </div>            
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
     name: "Login",
     data() {
          return {
               form: {
                    home_result: "",
                    away_result: "",
                    submitError: undefined
               }
          };
     },
     validations: {
          form: {
               home_result: {
                    required, 
                    validate: (value) => { 
                         if (value > 0)  
                              return true;
                         return false;
                    }
               },
               away_result: {
                    required,
                    validate: (value) => { 
                         if (value > 0)  
                              return true;
                         return false;
                    }
               }
          }
     },
     methods: {
          validateState(param) {
               let { $dirty, $error } = this.$v.form[param];
               return $dirty ? !$error : null;
           },
          async addResult() {
               try {
                    this.axios.defaults.withCredentials = true;
                    let response = await this.axios.put(
                         "http://localhost:3000/manage_league/addResultToGame",
                         {
                              gameID: this.$route.params.gameID,
                              home_result: this.form.home_result,
                              away_result: this.form.away_result
                         }
                    );
                    this.axios.defaults.withCredentials = false;
                    console.log(response);
                    this.$router.push("/manageLeague");
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
               this.addResult();
          }
     }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
