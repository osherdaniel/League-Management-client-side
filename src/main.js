import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";

import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  FormCheckboxPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  PaginationPlugin,
  TablePlugin,
  SpinnerPlugin,
  ImagePlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  ImagePlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin,
  TablePlugin,
  FormCheckboxPlugin,
  PaginationPlugin,
  SpinnerPlugin,
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  teams: localStorage.teams,
  referees: localStorage.referees,
  lastclear: localStorage.lastclear,

  searchQuery: localStorage.searchQuery,
  search_players: localStorage.search_players,
  search_coaches: localStorage.search_coaches,
  search_teams: localStorage.search_teams,

  login(username, lastclear) {
    localStorage.setItem("username", username);
    localStorage.setItem("lastclear", lastclear);

    this.username = username;
    this.lastclear = lastclear;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.setItem('lastclear', '');

    this.username = undefined;
    this.lastclear = undefined;

    localStorage.removeItem("searchQuery");
    localStorage.removeItem("search_players");
    localStorage.removeItem("search_coaches");
    localStorage.removeItem("search_teams");

  },
  search(searchQuery, players, coaches, teams){
    this.searchQuery = searchQuery;
    this.search_players = [];
    this.search_coaches = [];
    this.search_teams = [];

    this.search_teams.push(teams);
    this.search_coaches.push(coaches);
    this.search_players.push(players);

    localStorage.setItem("searchQuery", searchQuery);
    localStorage.setItem("search_players",  JSON.stringify(players));
    localStorage.setItem("search_coaches",  JSON.stringify(coaches));
    localStorage.setItem("search_teams",  JSON.stringify(teams));
  }
};
console.log(shared_data);

function checkUser() {
  let lastclear = localStorage.getItem('lastclear'), time_now  = (new Date()).getTime();
  if (lastclear != undefined && (time_now - lastclear) > 1000 * 60 * 60) 
    shared_data.logout();
}

// Vue.prototype.$root.store = shared_data;
setInterval(checkUser,1000 * 60 *  5);

new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
