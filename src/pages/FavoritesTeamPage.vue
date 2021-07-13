<template>
  <div class="container">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Favorites Teams</h1>
    </div>

    <div v-if="doneLoading">
      <div v-if="teams.length">
        <b-card-group deck class="justify-content-center" >
          <TeamPreview
            v-for="t in teams"
            :teamID="t.teamID"
            :name="t.name" 
            :coach="t.coach" 
            :players="t.players" 
            :key="t.teamID"></TeamPreview>
        </b-card-group>  
      </div>  
      
      <div class="ml-auto h5 font-weight-light text-muted text-center" id="msg" v-else>
        There is no favorites teams!
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
import TeamPreview from "../components/TeamPreview";
export default {
  components: {
    TeamPreview
  },
  data() {
    return {
      teams: [],
      doneLoading: false
    };
  },
  methods: {
    async updateTeams(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/users/favoriteTeams"
        );
        this.axios.defaults.withCredentials = false;

        let teams_response = response.data;

        if (teams_response != "No favorites teams")
          this.teams.push(...teams_response);

        this.doneLoading = true;  
        
      } 
      catch (error) {
        console.log("error in update teams")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("favorite teams mounted");
    this.updateTeams(); 
  }
};
</script>

<style lang="scss" scoped>
#msg {
  font-size: 18px;
}
</style>
