<template>
  <div>
    <div v-if="games.length">
      <GamePreview
        v-for="g in games"
        :gameID="g.gameID"
        :homeTeamID="g.homeTeamID" 
        :awayTeamID="g.awayTeamID" 
        :game_date="g.game_date" 
        :game_time="g.game_time" 
        :refereeID="g.refereeID" 
        :field="g.field" 
        :notInFavorite="false"
        :key="g.gameID"></GamePreview>
    </div>
    <div v-else class="ml-auto h5 font-weight-light text-muted text-center" style="font-size:22px">
      <br/><br/>
      There is no favorite games
    </div>
  </div>  
</template>

<script>
import GamePreview from "./GamePreview.vue";
export default {
  name: "FavoriteGames",
  components: {
    GamePreview
  }, 
  data() {
    return {
      games: [],
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/league/futureGamesHomePage"
        );
        this.axios.defaults.withCredentials = false;

        let games_response = response.data;
        this.games.push(...games_response);

        console.log(response);
      } 
      catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  created(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};
</script>

<style></style>
