<template>
  <div class="container">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Favorites Players</h1>
    </div>

    <div v-if="doneLoading">
      <b-card-group deck class="justify-content-center" v-if="players.length">
        <PlayerPreview
          v-for="p in players"
          :playerID="p.playerID"
          :name="p.name" 
          :team="p.team" 
          :position="p.position" 
          :image="p.image" 
          :key="p.playerID"></PlayerPreview>
      </b-card-group> 
      <div class="ml-auto h5 font-weight-light text-muted text-center" id="msg" v-else>
        There is no favorites players!
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
import PlayerPreview from "../components/PlayerPreview";
export default {
  components: {
    PlayerPreview
  },
  data() {
    return {
      players: [],
      doneLoading: false
    };
  },
  methods: {
    async updatePlayers(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/users/favoritePlayers"
        );
        this.axios.defaults.withCredentials = false;

        let players_response = response.data;

        if (players_response != "No favorites players")
          this.players.push(...players_response);

        this.doneLoading = true;    
      } 
      catch (error) {
        console.log("error in update players")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite players mounted");
    this.updatePlayers(); 
  }
};
</script>

<style lang="scss" scoped>
#msg {
  font-size: 18px;
}
</style>
