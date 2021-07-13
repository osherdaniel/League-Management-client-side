<template>
  <div class="container">
    <b-table hover :fields="future_games_field" :items="future_games" class="font-weight-light text-muted" style="font-size:16px">

         <template #cell(add_to_favorite)="row" v-if="$root.store.username">
              <button @click="addToFavorite(row.item.gameID)" v-if="row.item.notInFavorite" 
                    class="btn btn-outline-info font-weight-bold text-center" :ref="'btn' + row.item.gameID">
                    <span class="h5 font-weight-light text-muted"> Add game to favorites </span>
              </button>
          </template>
          <template #cell(home_team)="row">
               <a href="#" v-on:click="getTeamPage(row.item.homeTeamID)"> {{ row.item.home_team }}</a>
          </template>
          <template #cell(away_team)="row">
               <a href="#" v-on:click="getTeamPage(row.item.awayTeamID)"> {{ row.item.away_team }}</a>
          </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "FutureGameTable",
  props: {
     future_games: {
          type: Array,
          required: true
     }
  },
  data() {
    return {
      future_games_field:[
        { key: 'gameID', label: 'Game ID'},
        { key: 'game_time', label: 'Time' },
        { key: 'field', label: 'Field' },
        { key: 'game_date', label: 'Date' },
        { key: 'referee_name', label: 'Referee' },
        { key: 'home_team', label: 'Home Team' },
        { key: 'away_team', label: 'Away Name' },
        { key: 'add_to_favorite', label: 'Add to Favorite' },
      ]
     }
  },
  methods: {
     async getTeamPage(teamID){
          this.$router.push('/teamPage/'+ String(teamID))
     },
     async addToFavorite(row_gameID){
          try {
               this.axios.defaults.withCredentials = true;
               let response = await this.axios.post(
                    "http://localhost:3000/users/favoriteGames/",
                    {
                         gameID: row_gameID
                    }
               );
               this.axios.defaults.withCredentials = false;
               let server_respone = response.data;
               if (server_respone == "The game successfully saved as favorite")
                    this.$refs["btn" + row_gameID].disabled = true    
          }
          catch {

          }
    }
  }
};
</script>

<style>
  .container {
    background-image: none;
  }
</style>
