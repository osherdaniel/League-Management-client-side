<template>
  <b-container fluid align="center" justify="center">      
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Search</h1>
    </div>

    <b-row class="col-lg-3 col-lg-offset-3">
      <b-form-group
      label-align="center"
      label-for="search-input"
      label-cols-sm="3"
      label-align-sm="right"
      label-size="sm"
      class="mb-0">

        <b-input-group id="search-input" class="text-center" style="min-width:300px;">
          <b-form-input v-model="searchQuery" ></b-form-input>
          <b-input-group-append>
            <button  class="btn btn-outline-info font-weight-bold text-center" @click="Search">Search</button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>  
    </b-row>

    <div v-if="searching" class="h5 font-weight-light text-muted">
      <br/>
      Searching...
      <br/><br/>
      <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
      <div class="spinner-border text-secondary" style="width: 5rem; height: 5rem;" role="status"></div>
      <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
    </div>

    <b-row style="width:65%">
      <SearchPlayer :items="players"></SearchPlayer>
    </b-row>  

    <b-row style="width:65%" align-v="center" >
      <SearchCoach :items="coaches"></SearchCoach>
    </b-row> 

    <b-row style="width:65%" align-v="center">
      <SearchTeam :items="teams"></SearchTeam>
    </b-row>  

  </b-container>
</template>

<script>
  import SearchPlayer from "../components/SearchPlayer.vue";
  import SearchCoach from "../components/SearchCoach.vue";
  import SearchTeam from "../components/SearchTeam.vue";
  export default {
    name: "SearchPage",
    components: {
      SearchPlayer,
      SearchCoach,
      SearchTeam
    }, 
    data() {
      return {
        searchQuery: '',
        players: [],
        coaches: [],
        teams: [],
        searching: false
      }
    },
    methods: {
      async Search(){
        try {
          this.searching = true;
          this.axios.defaults.withCredentials = true;
          let response = await this.axios.get(
            "http://localhost:3000/search/" + this.searchQuery
          );
          this.axios.defaults.withCredentials = false;
          let server_respone = response.data;
          this.players = server_respone.players;
          this.coaches = server_respone.coaches;
          this.teams = server_respone.teams;
          
          this.searching = false;

          if (this.$root.store.username != undefined){
            this.$root.store.search(this.searchQuery, this.players, this.coaches, this.teams)
          }
      }
      catch {

      }
    }
  },
  mounted(){
    if (this.$root.store.username != undefined){
      this.searchQuery = localStorage.getItem("searchQuery");

      this.players = [];
      this.coaches = [];
      this.teams = [];

      this.players = JSON.parse(localStorage.getItem("search_players"));
      this.coaches = JSON.parse(localStorage.getItem("search_coaches"));
      this.teams = JSON.parse(localStorage.getItem("search_teams"));
    }
  }
}
</script>
