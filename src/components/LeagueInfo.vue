<template>
  <div>
    <br/><br>
    <b-card style="max-width: 40rem;">
      <div class="text-left">
        <h5 class="h3 title">
          <h5 class="card-header font-weight-bold text-muted text-center">{{league_name}}</h5>
          <small class="h5 font-weight-light text-muted text-center">Season: {{ current_season_name }}</small><br/><br/>
          <small class="h5 font-weight-light text-muted">Stage: {{ current_stage_name }}</small><br/><br/>
          <small class="h5 font-weight-light text-muted">
            Next Game:
            <ul>
              <li><small class="h5 font-weight-light text-muted">
                 Game ID: {{ next_game.gameID }}    
              </small></li>
              <li><small class="h5 font-weight-light text-muted">
                 Home Team: {{ next_game.home_team }}
              </small></li>   
              <li><small class="h5 font-weight-light text-muted">
                 Away Team: {{ next_game.away_team }}
              </small></li>
              <li><small class="h5 font-weight-light text-muted">
                Date: {{ next_game.game_date }}
              </small></li>  
              <li><small class="h5 font-weight-light text-muted">
                Time: {{ next_game.game_time }}
              </small></li>  
              <li><small class="h5 font-weight-light text-muted">
                Referee: {{ next_game.referee_name }}
              </small></li>  
              <li><small class="h5 font-weight-light text-muted">
                Field: {{ next_game.field }}
              </small></li>
            </ul> 
          </small>
        </h5> 
      </div>
    </b-card>
      <!-- <b-card
      img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-title>{{league_name}}</b-card-title>
      <b-card-text>
        Season: {{ current_season_name }}
        <br/>
        Stage: {{ current_stage_name }}
        <br/>
        Next Game:
        <ul class="game-content">
          <li> Game ID: {{ next_game.gameID }} </li>
          <li> Home Team: {{ next_game.home_team }} </li>
          <li> Away Team: {{ next_game.away_team }} </li>
          <li> Date: {{ next_game.game_date }} </li>
          <li> Time: {{ next_game.game_time }} </li>
          <li> Referee: {{ next_game.referee_name }} </li>
          <li> Field: {{ next_game.field }} </li>
        </ul>
      </b-card-text>
      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      league_name: "superiga", 
      current_season_name: "", 
      current_stage_name: "",
      next_game: ""
    };
  },
  methods: {
    async updateLeague(){
      console.log("response");
      try {
        this.axios.defaults.withCredentials = true;
        let response = await this.axios.get(
          "http://localhost:3000/league/LeagueInfo"
        );
        this.axios.defaults.withCredentials = false;

        let league_response = response.data;
        this.league_name = league_response.league_name;
        this.current_season_name = league_response.current_season_name;
        this.current_stage_name = league_response.current_stage_name;
        this.next_game = league_response.next_game;

        let j = 0;
        for (j = 0; j < this.$root.store.teams.length; j++){
            let team = this.$root.store.teams[j];
            if (this.next_game.homeTeamID == team.teamID)
                  this.next_game.home_team = team.teamName;
            else if (this.next_game.awayTeamID == team.teamID)
                  this.next_game.away_team = team.teamName;
        }

        j = 0;
        for (j = 0; j < this.$root.store.referees.length; j++){
          let referee = this.$root.store.referees[j];
          if (this.next_game.refereeID == referee.refereeID)
                this.next_game.referee_name = referee.firsName + " " + referee.lastName;
        }

        console.log(response);
      } 
      catch (error) {
        console.log("error in update games")
        console.log(error);
      }
    }
  }, 
  mounted(){
    console.log("Get league details");
    this.updateLeague(); 
  }
}
</script>

<style>
.league-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:rgb(44, 89, 116);
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>