<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" style="height:60px; font-size:18px" class="h5 font-weight-light text-muted">
      <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
          <b-nav-item :to="{ name: 'leagueGames' }">League Games</b-nav-item>
          <b-nav-item-dropdown left v-if="$root.store.username">
                <template #button-content> Favorites </template>
                <b-dropdown-item :to="{ name: 'favoritesGames' }" class="h5 font-weight-light text-muted">Favorites Games</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'favoritesPlayers' }" class="h5 font-weight-light text-muted">Favorites Players</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'favoritesTeams' }" class="h5 font-weight-light text-muted">Favorites Teams</b-dropdown-item>
          </b-nav-item-dropdown>  
          <b-nav-item-dropdown v-if="$root.store.username == 'AR'">
              <template #button-content> Manage League </template>
                <b-dropdown-item :to="{ name: 'manageLeague' }" class="h5 font-weight-light text-muted">Games</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'addGame' }" class="h5 font-weight-light text-muted">Add Game</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'addReferee' }" class="h5 font-weight-light text-muted">Add Referee</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'removeReferee' }" class="h5 font-weight-light text-muted">Remove Referee</b-dropdown-item>
          </b-nav-item-dropdown>  
          <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto h5 font-weight-light text-muted" v-if="!$root.store.username" style="font-size:18px;">
          <b-nav-text class="h5 font-weight-light"><u> Hello Guest!</u></b-nav-text>
          <b-nav-item :to="{ name: 'login' }" class="h5 font-weight-light text-muted">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }" class="h5 font-weight-light text-muted">Register</b-nav-item>
        </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>Welcome {{ $root.store.username }}</em>
              </template>
              <b-dropdown-item href="#" @click="Logout" class="h5 font-weight-light text-muted">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>  
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
    <div class="background-img" style="max-height:100px"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "http://localhost:3000/Logout"
        );
        this.axios.defaults.withCredentials = false;

        console.log(response);
        this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");

        this.$router.push("/").catch(() => {
        this.$forceUpdate();
        });
      } 
      catch (err) {
        console.log("error: " + err);
      }
    },
    async getTeams(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/teams/getTeams"
        );
        this.axios.defaults.withCredentials = false;

        const teams = response.data;
        this.$root.store.teams = teams;
      } 
      catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    },
    async getReferees(){
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/manage_league/getReferees"
        );
        this.axios.defaults.withCredentials = false;

        const referees = response.data;
        this.$root.store.referees = referees;
      } 
      catch (error) {

      }
    },

  },
  mounted(){
    this.getTeams();
    this.getReferees();
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

body {
  background-image: url('./assets/player.png');
  background-repeat: no-repeat;
  background-size: 350px auto;
  background-position-x: right;
  background-position-y: bottom;
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
