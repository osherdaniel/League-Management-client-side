<template>
  <b-container>
    <div v-if="doneLoading" >
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Future Games</h1>
      </div>
      <FutureGameTable :future_games="future_games"></FutureGameTable>

      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Past Games</h1>
      </div>    <PastGameTable :past_games="past_games"></PastGameTable>
    </div>

    <div v-else class="h5 font-weight-light text-muted text-center" style="font-size:20px">
      <br/><br/><br/>
      Loading...
      <br/><br/>
      <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
      <div class="spinner-border text-secondary" style="width: 5rem; height: 5rem;" role="status"></div>
      <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
    </div>

  </b-container>
</template>

<script>
import PastGameTable from "../components/PastGameTable.vue";
import FutureGameTable from "../components/FutureGameTable.vue";

export default {
  name: "LeagueGames",
  components: {
    PastGameTable,
    FutureGameTable
  }, 
  data() {
    return {
      doneLoading: false,
      future_games: [],
      past_games: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/league/LeaguePage"
        );
        this.axios.defaults.withCredentials = false;

        let league_respone = response.data;
        this.future_games = league_respone.future_games;
        this.past_games = league_respone.past_games;

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
  }
}
</script>