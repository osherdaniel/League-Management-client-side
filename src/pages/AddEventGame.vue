<template>
     <div align="center" justify="center" style="padding-top:50px">
          <b-card style="max-width: 40rem;" >
               <div class="text-left">
                    <h5 class="font-weight-light">
                         <h5 class="card-header text-muted text-center">Add Event to Game: GameID {{ $route.params.gameID }}</h5><br/>
                         <b-form @submit.prevent="addEventsToList(true)">
                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-event_time"
                                   label-cols-sm="3"
                                   label="Event Time:"
                                   label-for="event_time">
                                   
                                        <b-form-input
                                        id="event_time"
                                        v-model="$v.form.event_time.$model"
                                        type="text"
                                        :state="validateState('event_time')"></b-form-input>
                                             <b-form-invalid-feedback v-if="!$v.form.event_time.required"> Event Time field is required </b-form-invalid-feedback>
                                             <b-form-invalid-feedback else v-if="!$v.form.event_time.validate"> Event Time need to be in the format "{0-23}:{0-60}" </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     
                              
                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-minute"
                                   label-cols-sm="3"
                                   label="Minute:"
                                   label-for="minute">
                                   
                                        <b-form-input
                                        id="minute"
                                        v-model="$v.form.minute.$model"
                                        type="text"
                                        :state="validateState('minute')"></b-form-input>
                                        <b-form-invalid-feedback v-if="!$v.form.minute.required"> Minute field is required </b-form-invalid-feedback>
                                        <b-form-invalid-feedback else v-if="!$v.form.minute.validate"> Minute need to be number that bigger than 0 </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     

                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-event_description"
                                   label-cols-sm="3"
                                   label="Event Description:"
                                   label-for="event_description">
                                   
                                        <b-form-input
                                        id="event_description"
                                        v-model="$v.form.event_description.$model"
                                        type="text"
                                        :state="validateState('event_description')"></b-form-input>
                                        <b-form-invalid-feedback v-if="!$v.form.event_description.required"> Event Description field is required </b-form-invalid-feedback>
                                   </b-form-group>
                              </small>     

                              <small class="h5 font-weight-light text-muted">
                                   <b-form-group
                                   id="input-group-type"
                                   label-cols-sm="3"
                                   label="Type:"
                                   label-for="type">
                                   
                                        <b-form-select
                                        id="type"
                                        v-model="$v.form.type.$model"
                                        :options="type_option"
                                        :state="validateState('type')"></b-form-select>

                                        <b-form-invalid-feedback> Type is required</b-form-invalid-feedback>
                                   </b-form-group>   
                              </small>       
                              
     
                              <br/><br/>
                              <center>
                                   <button type="submit" class="btn btn-outline-info font-weight-bold text-center">
                                        <span style="font-size:larger;">  Add Event </span>
                                   </button>
                              </center> 

               
                              <br/><br/>
                              <center>
                                   <button type="button" class="btn btn-outline-info font-weight-bold text-center"
                                             :disabled="!submitAll" @click="onSubmit">
                                        <span style="font-size:larger;"> Add All Event </span>
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
     name: "AddEvent",
     data() {
          return {
               submitAll: false,
               listEvents: [],
               form: {
                    event_time: "",
                    minute: "",
                    event_description: "",
                    type: null,
                    submitError: undefined
               },
               type_option: [
                    { value: 'Goal', text: 'Goal' },
                    { value: 'Offsife', text: 'Offsife' },
                    { value: 'Offense', text: 'Offense' },
                    { value: 'RedCard', text: 'RedCard' },
                    { value: 'YellowCard', text: 'YellowCard' },
                    { value: 'Injury', text: 'Injury' },
                    { value: 'Subsitution', text: 'Subsitution' }
               ]
          };
     },
     validations: {
          form: {
               event_time: {
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
               minute: {
                    required,
                    validate: (value) => { 
                         if (value > 0)  
                              return true;
                         return false;
                    }
               },
               event_description: {
                    required
               },
               type: {
                    required
               }

          }
     },
     methods: {
          validateState(param) {
               let { $dirty, $error } = this.$v.form[param];
               return $dirty ? !$error : null;
           },
          addEventsToList(flag){
               this.form.submitError = undefined;
               this.$v.form.$touch();
               if (this.$v.form.$anyError) 
                    return;

               let event = {
                    event_time: this.form.event_time,
                    minute: this.form.minute,
                    event_description: this.form.event_description,
                    type: this.form.type
               }
               this.listEvents.push(event);
               this.submitAll = true;

               if(flag)
                    this.onReset();

          },
          onReset() {
               this.form = {
                    event_time: "",
                    minute: "",
                    event_description: "",
                    type: null
               };
               this.$nextTick(() => {
                    this.$v.$reset();
               });
          },
          async addListEvent() {
               try {
                    this.axios.defaults.withCredentials = true;
                    let response = await this.axios.post(
                         "http://localhost:3000/manage_league/addListEventsToGame",
                         {
                              gameID: this.$route.params.gameID,
                              listEvents: this.listEvents
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
          onSubmit() {
               if(this.form.event_time != '' || this.form.minute != '' || this.form.event_description != '' || this.form.type != null){
                    this.addEventsToList(false); 

                    this.form.submitError = undefined;
                    this.$v.form.$touch();
                    if (this.$v.form.$anyError) 
                         return;
               }
           
               this.addListEvent();
               this.listEvents = [];
          }
     }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
