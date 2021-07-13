<template>
  <div>
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
          <small class="h5 font-weight-light text-muted">Coach ID: {{ coachID }}</small><br/><br/>
          <small class="h5 font-weight-light text-muted">Common name : {{ common_name }}</small><br/><br/>
          <small class="h5 font-weight-light text-muted">Team Name: {{ team_name }}</small><br/><br/>
          <small class="h5 font-weight-light text-muted">Birthday: {{ birthday }} </small><br/><br/>
          <small class="h5 font-weight-light text-muted">Birth Country: {{ birthcountry }} </small><br/><br/>
          <small class="h5 font-weight-light text-muted">Nationality: {{ nationality }} </small><br/><br/>
        </h5>
      </div>
    </b-card>
    <!-- <h1 class="title"> {{ name }} </h1>

    <b-card
     title="Coach"
     :img-src= "image"
     img-top
     tag="article"
     style="max-width: 20rem;"
     class="mb-2">
    <b-card-text>
      Coach ID: {{ coachID }} <br>   
      Common name : {{ common_name }} <br/>
      Team Name: {{ team_name }} <br/>
      Birthday: {{ birthday }} <br/>
      Birth Country: {{ birthcountry }} <br/>
      Nationality: {{ nationality }} <br/> 
    </b-card-text>
  </b-card> -->
  </div>
</template>

<script>
export default {
  name: "CoachPage",
  data() {
    return {
      coachID: "",
      name: "",
      team_name: "",
      image: "",
      common_name: "",
      nationality: "",
      birthday: "",
      birthcountry: ""
    }
  },
  methods: {
    async showCoach(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "http://localhost:3000/coaches/coachFullDetails/" + this.$route.params.coachID
        );
        this.axios.defaults.withCredentials = false;

        const coach_response = response.data;

        this.coachID = coach_response.coachID;
        this.name = coach_response.name;
        this.image = coach_response.image;
        this.common_name = coach_response.common_name;
        this.nationality = coach_response.nationality;
        this.birthday = coach_response.birthdate;
        this.birthcountry = coach_response.birthcountry;

        let teamID = coach_response.teamID;
        let j = 0;
        for (j = 0; j < this.$root.store.teams.length; j++){
          let team = this.$root.store.teams[j];
          if (teamID == team.teamID)
                this.team_name = team.teamName;
        }

        if (this.team_name == "")
          this.$router.push("/*");
        console.log(response);
      
      } 
      catch (error) {
        console.log("error in show coach")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("personal page of coach mounted");
    this.showCoach(); 
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
