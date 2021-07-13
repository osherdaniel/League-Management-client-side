<template>
  <div>
    <b-card style="max-width: 30rem;">
      <div class="text-left">
        <h5 class="h3 title">
          <h5 class="card-header font-weight-bold text-muted text-center">Game ID: {{ gameID }}</h5>
          <small class="h5 font-weight-light text-muted">Home Team: {{ home_team }}</small><br/>
          <small class="h5 font-weight-light text-muted">Away Team: {{ away_team }}</small><br/>
          <small class="h5 font-weight-light text-muted">Date: {{ game_date }}</small><br/>
          <small class="h5 font-weight-light text-muted">Time: {{ game_time }}</small><br/>
          <small class="h5 font-weight-light text-muted">Referee: {{ referee_name }}</small><br/>
          <small class="h5 font-weight-light text-muted">Field: {{ field }}</small><br/>
        </h5> 
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      gameID: {
        type: Number,
        required: true
      },
      homeTeamID: {
        type: Number,
        required: true
      },
      awayTeamID: {
        type: Number,
        required: true
      },
      game_date: {
        type: String,
        required: true
      },
      game_time: {
        type: String,
        required: true
      },
      refereeID: {
        type: Number,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      notInFavorite: {
        type: Boolean,
        required: true
      }
  }, 
  data (){
    return {
      home_team: "", 
      away_team: "", 
      referee_name: ""
    };
  },
  methods: {
    async addToFavorite(){
     try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.post(
          "http://localhost:3000/users/favoriteGames/",
           {
              gameID: this.gameID
           }
        );
        this.axios.defaults.withCredentials = false;
        let server_respone = response.data;
        if (server_respone == "The game successfully saved as favorite")
          this.notInFavorite = false;
     }
     catch {

     }
    },
  },
  mounted(){
    console.log("game preview mounted");

    let j = 0;
    for (j = 0; j < this.$root.store.teams.length; j++){
        let team = this.$root.store.teams[j];
        if (this.homeTeamID == team.teamID)
              this.home_team = team.teamName;
        else if (this.awayTeamID == team.teamID)
              this.away_team = team.teamName;
    }

    j = 0;
    for (j = 0; j < this.$root.store.referees.length; j++){
      let referee = this.$root.store.referees[j];
      if (this.refereeID == referee.refereeID)
            this.referee_name = referee.firsName + " " + referee.lastName;
    }
  } 
};
</script>

<style>
.game-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.game-preview .game-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.game-preview .game-content {
  width: 100%;
  overflow: hidden;
}
</style>
