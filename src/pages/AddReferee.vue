<template>   
  <div align="center" justify="center">      
    <br/><br/>

    <b-card style="max-width: 60rem;" align="center" justify="center">
        <div class="text-left">
          <h5 class="card-header text-muted text-center">
            <h4 class="card-header font-weight-light text-center">Add Referee</h4> <br/>
            <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-userName"
                  label-cols-sm="3"
                  label=" Referee UserName:"
                  label-for="userName">
                  <b-form-input
                    id="userName"
                    v-model="$v.form.userName.$model"
                    type="text"
                    :state="validateState('userName')"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.userName.required"> UserName is required </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.userName.length"> UserName length should be between 3-8 characters long </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.userName.alpha"> UserName alpha </b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-firstName"
                  label-cols-sm="3"
                  label="Referee First Name:"
                  label-for="firstName">
                  <b-form-input
                    id="firstName"
                    v-model="$v.form.firstName.$model"
                    type="text"
                    :state="validateState('firstName')"/>
                  <b-form-invalid-feedback v-if="!$v.form.firstName.required">First name is required</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.firstName.length" >First name length should be between at least 2 characters long</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.firstName.alpha"> First name alpha </b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-lastName"
                  label-cols-sm="3"
                  label=" RefereeLast Name:"
                  label-for="lastName">
                  <b-form-input
                    id="lastName"
                    v-model="$v.form.lastName.$model"
                    type="text"
                    :state="validateState('lastName')"/>
                  <b-form-invalid-feedback v-if="!$v.form.lastName.required">Last name is required</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.lastName.length" >Last name length should be between at least 2 characters long</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.lastName.alpha"> Last name alpha </b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <small class="h5 font-weight-light text-muted">
                <b-form-group id="input-group-email" label-cols-sm="3" label="email:" label-for="email">
                  <b-form-input
                    id="email"
                    v-model="$v.form.email.$model"
                    type="email"
                    :state="validateState('email')"/>
                  <b-form-invalid-feedback v-if="!$v.form.email.required">Email is required</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.email.valid">The email entered is not in the correct format</b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-country"
                  label-cols-sm="3"
                  label="Referee Country:"
                  label-for="country">
                  <b-form-select
                    id="country"
                    v-model="$v.form.country.$model"
                    :state="validateState('country')"
                    :options="countries"></b-form-select>
                  <b-form-invalid-feedback v-if="!$v.form.country.required"> Country is required</b-form-invalid-feedback>
                </b-form-group>
              </small>

              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-Password"
                  label-cols-sm="3"
                  label="Password:"
                  label-for="password">
                  <b-form-input
                    id="password"
                    type="password"
                    v-model="$v.form.password.$model"
                    :state="validateState('password')"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.password.required">Password is required </b-form-invalid-feedback>
                  <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
                    Your password should be <strong>strong</strong>. <br />
                    For that, your password should be also:
                  </b-form-text>
                  <b-form-invalid-feedback
                    v-if="$v.form.password.required && !$v.form.password.length">
                    Have length between 5-10 characters long 
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.password.valid">  Password must contains one digit and one special letter (#?!@$%^&*-) </b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-confirmedPassword"
                  label-cols-sm="3"
                  label="Confirm Password:"
                  label-for="confirmedPassword">
                  <b-form-input
                    id="confirmedPassword"
                    type="password"
                    v-model="$v.form.confirmedPassword.$model"
                    :state="validateState('confirmedPassword')"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">  Password confirmation is required </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.confirmedPassword.sameAsPassword">
                    The confirmed password is not equal to the original password
                  </b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-profileImage"
                  label-cols-sm="3"
                  label="Referee Profile Image:"
                  label-for="profileImage">
                  <b-form-input
                    id="profileImage"
                    type="text"
                    v-model="$v.form.profileImage.$model"
                    :state="validateState('profileImage')"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.profileImage.required"> Link to profile image is required</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.profileImage.url"> Link is not a valid url</b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <small class="h5 font-weight-light text-muted">
                <b-form-group
                  id="input-group-training"
                  label-cols-sm="3"
                  label="Referee Training:"
                  label-for="training">
                  <b-form-input
                    id="training"
                    type="text"
                    v-model="$v.form.training.$model"
                    :state="validateState('training')" ></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.training.required"> Training is required</b-form-invalid-feedback>
                </b-form-group>
              </small>  

              <button type="submit" class="btn btn-outline-info font-weight-bold text-center" style="margin:30px; min-width:200px">
                  <span style="font-size:larger;"> Add Referee </span>
              </button>  

            </b-form>
            <b-alert
              class="mt-2"
              v-if="form.submitError"
              variant="warning"
              dismissible
              show> Add referee failed: {{ form.submitError }}
            </b-alert>

          <div v-if="showSuccess"> 
            The referee has ben added
          </div>
        </h5>  
      </div>  
    </b-card>  
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      showSuccess: false,
      form: {
        userName: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        profileImage: "",
        training: "",
        submitError: ""
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      userName: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        length: (u) => minLength(2)(u),
        alpha
      },
      lastName: {
        required,
        length: (u) => minLength(2)(u),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        valid: (value) => /[0-9]/.test(value) && /[#?!@$%^&*-]/.test(value)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      },
      profileImage: {
        required,
        url
      },
      training: {
        required,
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },

  methods: {
      validateProps() {
      if ((this.type === "caution" || this.type === "primary") && this.size === "mega") {
        console.error('Invalid props');
      }
    },
    validateState(param) {
      let { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async AddReferee() {
      try {
        this.form.submitError = "";

        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/manage_league/addReferee",
          {
              user: [{
                userName: this.form.userName,
                password: this.form.password,
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                country: this.form.country,
                image: this.form.profileImage,
                email: this.form.email
              }],
              training: this.form.training
          }
        );
        this.axios.defaults.withCredentials = false;
        if (response.data == "New Refere added"){
          this.showSuccess = true;
          
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.get(
            "http://localhost:3000/manage_league/getReferees"
          );
          this.axios.defaults.withCredentials = false;

          const referees = response.data;
          this.$root.store.referees = referees;
        }
      } 
      catch (err) {
        console.log(err.response);
        console.log(err.response.data.message);
        this.form.submitError = err.response.data;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError){ 
        this.form.submitError = "";
        return;
      }
      
      this.AddReferee();  
    },
    onReset() {
      this.form = {
        userName: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        profileImage: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
