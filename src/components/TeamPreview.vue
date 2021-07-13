<template>
  <!-- <div class="team-preview">
    <div :title="id" class="team-title">
      <b>Team ID:</b> {{ teamID }}
    </div>
    <ul class="team-content">
      <li> Name: {{ name }} </li>
      <li> Coach Name: {{ coach }} </li>
      <li> Players:
          <ul class="team-content">
               <li v-for="(player,index) in players" :key="index">
               {{ player.name }} </li>
          </ul>     
      </li>
    </ul>
    <b-button href="#" @click="getTeamPage" variant="primary">Go to {{ name }} page </b-button>
  </div> -->

  <div>
    <b-card style="max-width: 40rem;">
      <div class="text-left">
        <h5 class="h3 title">
          <h5 class="card-header font-weight-bold text-muted text-center">Team ID: {{ teamID }}</h5>
          <small class="h5 font-weight-light text-muted">Name: {{ name }}</small><br/>
          <small class="h5 font-weight-light text-muted">Coach Name: {{ coach }}</small><br/>
          <small class="h5 font-weight-light text-muted">
            Players:
            <ul class="team-content">
                <li v-for="(player,index) in players" :key="index">
                <small class="h5 font-weight-light text-muted"> {{ player.name }} </small> 
                </li>
            </ul> 
          </small>
        </h5>
        <center>
          <button type="button" @click="getTeamPage" class="btn btn-outline-info font-weight-bold text-center">Go to Team page</button>
        </center>  
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "TeamPreview",
  props: {
     teamID: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      coach: {
        type: String,
        required: true
      },
      players: {
        type: Array,
        required: true
      },
  },
  methods: {
     async getTeamPage(){
          this.$router.push('/teamPage/'+ String(this.teamID))
     }
  },
  mounted(){
    console.log("team preview mounted")
  } 
};
</script>

<style>
.team-preview {
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

.team-preview .team-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.team-preview .team-content {
  width: 100%;
  overflow: hidden;
}
</style>
