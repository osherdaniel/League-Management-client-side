<template>
  <b-container>
     <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 class="display-4">League Games</h1>
     </div>
     <div v-if="doneLoading">
          <b-table hover :fields="games_field" :items="games" class="font-weight-light text-muted" style="font-size:13.5px">
                    <template #cell(events)="row">
                    <EventPreview
                         v-for="(e,index) in row.item.events"
                         :event_time="e.event_time"
                         :minute="e.minute" 
                         :event_description="e.event_description" 
                         :type="e.type" 
                         :key="index"></EventPreview>  
                    </template>
                    <template #cell(actions)="row" v-if="$root.store.username">
                         <button  @click="UpdateResult(row.item.gameID)"  v-if="!row.item.futureGame" 
                                   class="btn btn-outline-info font-weight-bold text-center" :ref="'btn' + row.item.gameID">
                              <span class="h5 font-weight-light text-muted"> Update result </span>
                         </button>
          
                         <br/><br/>
                         <button  @click="AddEvents(row.item.gameID)"  v-if="!row.item.futureGame" 
                                   class="btn btn-outline-info font-weight-bold text-center" :ref="'btn' + row.item.gameID">
                              <span class="h5 font-weight-light text-muted"> Add events </span>
                         </button>
                    </template>
          </b-table>
     </div>

     <div v-else class="text-center">
       <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
    </div>     
  </b-container>
</template>

<script>
import EventPreview from "../components/EventPreview.vue";
export default {
  name: "ManageLeague",
  components: {
    EventPreview
  }, 
  data() {
    return {
          games: [],
          doneLoading: false,
          games_field:[
               { key: 'gameID', label: 'Game ID' },
               { key: 'game_time', label: 'Time' },
               { key: 'game_date', label: 'Date', sortable: true, sortDirection: 'desc'},
               { key: 'field', label: 'Field' },
               { key: 'referee_name', label: 'Referee' },
               { key: 'home_team', label: 'Home Team', sortable: true, sortDirection: 'desc'},
               { key: 'away_team', label: 'Away Name', sortable: true, sortDirection: 'desc' },
               { key: 'home_result', label: 'Home Result' },
               { key: 'away_result', label: 'Away Result' },
               { key: 'events', label: 'Events' },
               { key: 'actions', label: 'Actions' },
          ]
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
          let future_games = league_respone.future_games;
          let past_games = league_respone.past_games;
          
          let i = 0;
          for (i = 0; i < future_games.length; i++)
               future_games[i].futureGame = true;
          
          this.games.push(...future_games);     
          this.games.push(...past_games);     
          
          i = 0;
          for (i = 0; i < this.games.length; i++){
               let homeTeamID = this.games[i].homeTeamID;
               let awayTeamID = this.games[i].awayTeamID;

               let j = 0;
               for (j = 0; j < this.$root.store.teams.length; j++){
                    let team = this.$root.store.teams[j];
                    if (homeTeamID == team.teamID)
                         this.games[i].home_team = team.teamName;
                    else if (awayTeamID == team.teamID)
                         this.games[i].away_team = team.teamName;
               }

               j = 0;
               for (j = 0; j < this.$root.store.referees.length; j++){
                    let referee = this.$root.store.referees[j];
                    if (this.games[i].refereeID == referee.refereeID)
                         this.games[i].referee_name = referee.firsName + " " + referee.lastName;
               }  
          }

          this.doneLoading = true;
    },

     async UpdateResult(row_gameID){
          this.$router.push('/addResult/'+ String(row_gameID))
     },

     async AddEvents(row_gameID){
          this.$router.push('/addEvent/'+ String(row_gameID))
    },
  }
}
</script>