<template>
  <div class="container">
    <div v-if="doneLoading">
      <b-card>        
        <div class="pt-4 text-center">
          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto">
            <h1 class="display-4 text-center">{{ name }}</h1>
            <br/>
            
            <button href="#" type="button" @click="addToFavorite" :disabled="!notInFavorite"  class="btn btn-outline-info">Add {{ name }} to favorites </button>   
            <br/><br/>
            <b-card>
              <a href="javascript:;">
                  <img :src="coach_image"
                  class="circle mx-auto d-block shadow"
                  style="width: auto"/>
              </a>

              <div class="pt-4 text-center">
                <h5 class="h3 title">
                  <small class="h5 font-weight-bold text-muted">Coach</small><br/>
                  <small class="h5 font-weight-light text-muted">Name: {{ coach }} </small><br/>
                </h5>
                <button href="#" type="button" @click="getCoachPage" class="btn btn-outline-info">Go to coach page</button>
              </div>
            </b-card>
          </div>

          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Players</h1>
          </div>

          <b-card-group deck>
            <div v-for="p in players" :key="p.playerID">
              <b-card style="width: 20rem;">
                <a href="javascript:;">
                    <img :src="p.image"
                    class="circle mx-auto d-block shadow"
                    style="height: 100px; width: auto"/>
                </a>
                
                <div class="pt-4 text-center">
                  <h5 class="h3 title">
                    <small class="h5 font-weight-light text-muted"> Name: {{ p.name }}</small><br/>
                    <button type="button" @click="getPlayerPage(p)" class="btn btn-outline-info">Go to player page</button>
                  </h5>
                </div>
              </b-card>
            </div>
          </b-card-group> 

          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Future Games</h1>
          </div>
          <FutureGameTable :future_games="future_games"></FutureGameTable>
          
          <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Past Games</h1>
          </div>
          <PastGameTable :past_games="past_games"></PastGameTable>
        </div>
      </b-card>
    </div>

    <div v-else class="h5 font-weight-light text-muted text-center" style="font-size:20px; text-color:black;">
        <br/><br/><br/>
        Loading...
        <br/><br/>
        <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
        <div class="spinner-border text-secondary" style="width: 5rem; height: 5rem;" role="status"></div>
        <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
    </div>
  </div>
</template>
  
<script>
import PastGameTable from "../components/PastGameTable.vue";
import FutureGameTable from "../components/FutureGameTable.vue";

export default {
  name: "TeamPage",
  components: {
     PastGameTable,
     FutureGameTable
  }, 
  data (){
    return {
      teamID: "",
      name: "",
      players: [],
      future_games: [],
      past_games: [],
      coach: "",
      coach_image: "",
      coachID: "",
      notInFavorite: false,
      doneLoading: false
    }
  },

  methods: {
    async showTeam(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/teams/teamFullDetails/" + this.$route.params.teamID
        );
        this.axios.defaults.withCredentials = false;

        let team_response = response.data;

        this.teamID = team_response.teamID;
        this.players = team_response.players;
        this.name = team_response.name;
        this.coach = team_response.coach;
        this.coachID = team_response.coachID;
        this.future_games = team_response.future_games;
        console.log(team_response.future_games);
        console.log(team_response.past_Games);

        this.past_games = team_response.past_Games;
        this.coach_image = team_response.coach_image;
        this.notInFavorite = team_response.notInFavorite;
        console.log(response);

        let i = 0;
        for (i = 0; i < this.future_games.length; i++){
          let homeTeamID = this.future_games[i].homeTeamID;
          let awayTeamID = this.future_games[i].awayTeamID;

          let j = 0;
          for (j = 0; j < this.$root.store.teams.length; j++){
               let team = this.$root.store.teams[j];
               if (homeTeamID == team.teamID)
                    this.future_games[i].home_team = team.teamName;
               else if (awayTeamID == team.teamID)
                    this.future_games[i].away_team = team.teamName;
          }

          j = 0;
          for (j = 0; j < this.$root.store.referees.length; j++){
            let referee = this.$root.store.referees[j];
            if (this.future_games[i].refereeID == referee.refereeID)
              this.future_games[i].referee_name = referee.firsName + " " + referee.lastName;
          }     
        }

        i = 0;
        for (i = 0; i < this.past_games.length; i++){
          let homeTeamID = this.past_games[i].homeTeamID;
          let awayTeamID = this.past_games[i].awayTeamID;

          let j = 0;
          for (j = 0; j < this.$root.store.teams.length; j++){
               let team = this.$root.store.teams[j];
               if (homeTeamID == team.teamID)
                    this.past_games[i].home_team = team.teamName;
               else if (awayTeamID == team.teamID)
                    this.past_games[i].away_team = team.teamName;
          }

          j = 0;
          for (j = 0; j < this.$root.store.referees.length; j++){
            let referee = this.$root.store.referees[j];
            if (this.past_games[i].refereeID == referee.refereeID)
              this.past_games[i].referee_name = referee.firsName + " " + referee.lastName;
          }     
        }

        this.doneLoading = true;

      } 
      catch (error) {
        console.log("error in show team page")
        console.log(error);
        this.$router.push('/404')
      }
    },
     async getPlayerPage(p){
          this.$router.push('/playerPage/'+ String(p.playerID))
     },
     async getCoachPage(){
          this.$router.push('/coachPage/'+ String(this.coachID))
     },
     async addToFavorite(){
          try {
          this.axios.defaults.withCredentials = true;
          let response = await this.axios.post(
               "http://localhost:3000/users/favoriteTeams/",
               {
                    teamID: this.$route.params.teamID
               }
          );
          this.axios.defaults.withCredentials = false;
          let server_respone = response.data;
          if (server_respone == "The team successfully saved as favorite")
               this.notInFavorite = false;
          }
          catch {

          }
    },
  }, 
  mounted(){
    console.log("personal page of team mounted");
    this.showTeam(); 
  },
  watch: {
  '$route.params': {
      handler(newValue) {
          this.showTeam(newValue)
      },
      immediate: true,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
