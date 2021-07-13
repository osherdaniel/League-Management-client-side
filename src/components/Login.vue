<template>
  <b-card style="max-width: 40rem;">
      <div class="text-left">
        <h5 class="font-weight-light">
          <h5 class="card-header text-muted text-center">Login</h5> <br/>
          <b-form @submit.prevent="onLogin">
            <small class="h5 font-weight-light text-muted">
              <b-form-group
                id="input-group-userName"
                label-cols-sm="3"
                label="userName:"
                label-for="userName">

                <b-form-input
                  class="text-muted"
                  id="userName"
                  v-model="$v.form.userName.$model"
                  type="text"
                  :state="validateState('userName')"></b-form-input>
                <b-form-invalid-feedback> UserName is required </b-form-invalid-feedback>
              </b-form-group>
            </small><br/>  

            <small class="h5 font-weight-light text-muted">
              <b-form-group
                id="input-group-Password"
                label-cols-sm="3"
                label="Password:"
                label-for="Password">
                
                <b-form-input
                  id="Password"
                  type="password"
                  v-model="$v.form.password.$model"
                  :state="validateState('password')"></b-form-input>
                <b-form-invalid-feedback> Password is required </b-form-invalid-feedback>
              </b-form-group>
            </small><br/> 

            <center>
              <button type="submit" class="btn btn-outline-info font-weight-bold text-center">
                  <span style="font-size:larger;"> Login </span>
              </button>
            </center>     

            <br/><br/>

            <div class="h5 font-weight-light text-muted">
              Do not have an account yet?
              <router-link to="register"> Register in here</router-link>
            </div>
          </b-form>
          <b-alert
            class="mt-2"
            v-if="form.submitError"
            variant="warning"
            dismissible
            show>
            Login failed: {{ form.submitError }}
          </b-alert> 
        </h5>
        <center>
        </center>  
      </div>
    </b-card>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      userName: {
        required, 
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      let { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/Login",
          {
            userName: this.form.userName,
            password: this.form.password
          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        this.$root.store.login(this.form.userName, (new Date()).getTime());
        this.$router.push("/").catch(()=>{});;
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
