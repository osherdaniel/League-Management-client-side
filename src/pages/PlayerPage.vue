<template>
  <div>
    <div v-if="doneLoading">
      <br/><br/>
      <b-card style="max-width: 60em;margin:0 auto;" class="justify-content-center">
        <a href="javascript:;">
            <img :src="image"
            class="circle mx-auto d-block shadow"
            style="height: 200px; width: auto"/>
        </a>
        
        <div class="pt-4 text-center">
          <h5 class="h3 title">
            <small class="h5 font-weight-bold text-muted">{{ name }}</small><br/><br/>
            <small class="h5 font-weight-light text-muted">Player ID: {{ playerID }} </small><br/><br/>
            <small class="h5 font-weight-light text-muted">Common name : {{ common_name }}</small><br/><br/>
            <small class="h5 font-weight-light text-muted">Team Name: {{ team_name }}</small><br/><br/>
            <small class="h5 font-weight-light text-muted">Position: {{ position }} </small><br/><br/>
            <small class="h5 font-weight-light text-muted">Birthday: {{ birthday }} </small><br/><br/>
            <small class="h5 font-weight-light text-muted">Birth Country: {{ birthcountry }} </small><br/><br/>
            <small class="h5 font-weight-light text-muted">Nationality: {{ nationality }} </small><br/><br/>
            <small class="h5 font-weight-light text-muted">Height: {{ height }} </small><br/><br/>
            <small class="h5 font-weight-light text-muted">Weight: {{ weight }} </small><br/><br/><br/>
          </h5>
          <button type="button" @click="addToFavorite" class="btn btn-outline-info" :disabled="!notInFavorite">
            <small class="h5 font-weight-bold text-muted">Add {{ name }} to favorites</small>
          </button>
        </div>
      </b-card>
    </div>

    <div v-else class="h5 font-weight-light text-muted text-center">
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
export default {
  name: "PlayerPage",
  data() {
    return {
      doneLoading: false,
      playerID: this.$route.params.playerID,
      name: "",
      team_name: "",
      position: "",
      image: "",
      common_name: "",
      nationality: "",
      birthday: "",
      birthcountry: "",
      height: "",
      weight: "",
      notInFavorite: false
    }
  },
  methods: {
    async showPlayer(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/players/playerFullDetails/" + this.$route.params.playerID
        );
        this.axios.defaults.withCredentials = false;

        let player_response = response.data;

        this.playerID = player_response.playerID;
        this.name = player_response.name;
        this.height = player_response.height;
        this.weight = player_response.weight;
        this.team_name = player_response.team_name;
        this.image = player_response.image;
        this.common_name = player_response.common_name;
        this.nationality = player_response.nationality;
        this.birthday = player_response.birthdate;
        this.birthcountry = player_response.birthcountry;
        this.position = player_response.position;
        this.notInFavorite = player_response.notInFavorite;

        this.doneLoading = true;

        console.log(response);
      } 
      catch (error) {
        console.log("error in show player page")
        console.log(error);
        this.$router.push('/404')
      }
    },

    async addToFavorite(){
     try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/users/favoritePlayers/",
           {
            playerID: this.playerID
           }
        );
        this.axios.defaults.withCredentials = false;
        let server_respone = response.data;
        if (server_respone == "The player successfully saved as favorite")
          this.notInFavorite = false;
     }
     catch {

     }
    },
  }, 
  mounted(){
    console.log("personal page of player mounted");
    this.showPlayer(); 
  },
  watch: {
    '$route.params': {
        handler(newValue) {
            this.showPlayer(newValue)
        },
        immediate: true,
    }
}
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
