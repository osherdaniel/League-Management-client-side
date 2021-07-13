<template>
     <div align="center" justify="center" style="padding-top:50px">
          <b-card style="max-width: 40rem;" >
               <div class="text-left">
                    <h5 class="font-weight-light">
                         <h5 class="card-header text-muted text-center">Remove Referee</h5><br/>
                         <b-form @submit.prevent="onRemoving">
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

                              <br/><br/>
                              <center>
                                   <button type="submit" class="btn btn-outline-info font-weight-bold text-center">
                                        <span style="font-size:larger;">Remove Referee</span>
                                   </button>
                              </center> 
                         </b-form>

                         <b-alert
                              class="mt-2"
                              v-if="form.submitError"
                              variant="warning"
                              dismissible
                              show>
                              Remove referee failed: {{ form.submitError.data }}
                         </b-alert>

                         <div v-if="showSuccess" class="h5 font-weight-light text-muted text-center">
                              <br/><br/>
                              The referee has been removed
                         </div>
                    </h5>
               </div>          
          </b-card>
     </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
     name: "RemoveReferee",
     data() {
          return {
               showSuccess: false,
               referees: [],
               form: {
                    referee: null,
                    submitError: undefined
               }
          };
     },
     validations: {
          form: {
               referee: {
                    required
               }
          }
     },
     methods: {
          validateState(param) {
               let { $dirty, $error } = this.$v.form[param];
               return $dirty ? !$error : null;
           },
          async removeReferee() {
               try {
                    this.axios.defaults.withCredentials = true;
                    let response = await this.axios.delete(
                         "http://localhost:3000/manage_league/removeReferee/" + String(this.form.referee)
                    );
                    this.axios.defaults.withCredentials = false;
                    console.log(response.data);
                    if(response.data == "The referee was removed!"){
                         this.showSuccess = true;

                         let j = 0;
                         for (j = 0; j < this.$root.store.referees.length; j++){
                              let referee_item = this.$root.store.referees[j];
                              if (this.form.referee == referee_item.refereeID)
                                    this.$root.store.referees.splice(j, 1);
                         } 
                    }

               }
               catch (err) {
                    console.log(err.response);
                    this.form.submitError = err.response;
               }
          },
          onRemoving() {
               this.form.submitError = undefined;
               this.$v.form.$touch();
               if (this.$v.form.$anyError) 
                    return;
               this.removeReferee();
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
     } 
}  

</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
