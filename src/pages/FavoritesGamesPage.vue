<template>
  <div class="container">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Favorites Games</h1>
    </div>

    <div v-if="doneLoading">
      <b-card-group deck class="justify-content-center" v-if="games.length">
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
      </b-card-group>

      <div class="ml-auto h5 font-weight-light text-muted text-center" id="msg" v-else>
        There is no favorites games!
      </div>
    </div>    

    <div v-else class="text-center">
       <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
       <div class="spinner-border text-secondary" style="width: 5rem; height: 5rem;" role="status"></div>
       <div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"></div>
    </div>
  </div>
</template>

<script>
import GamePreview from "../components/GamePreview";
export default {
  components: {
    GamePreview
  },
  data() {
    return {
      games: [],
      doneLoading: false
    };
  },
  methods: {
    async updateGames(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/users/favoriteGames"
        );
        this.axios.defaults.withCredentials = false;

        let games_response = response.data;
        
        if (games_response != "No favorites games")
          this.games.push(...games_response);

        this.doneLoading = true;      

      } 
      catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite games mounted");
    this.updateGames(); 
  }
};

</script>

<style lang="scss" scoped>
#msg {
  font-size: 18px;
}
</style>
