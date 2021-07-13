<template>
  <div text-center>
    <b-card style="max-width: 20rem; max-height: 25rem; min-height: 25rem">
      <a href="javascript:;">
          <img :src="image"
          class="circle mx-auto d-block shadow"
          style="height: 100px; width: auto"/>
      </a>
      
      <div class="pt-4 text-center">
        <h5 class="h3 title">
          <small class="h5 font-weight-bold text-muted"> Name: {{ name }}</small><br/>
          <small class="h5 font-weight-light text-muted">Player ID: {{ playerID }} </small><br/>
          <small class="h5 font-weight-light text-muted">Team Name: {{ team }}</small><br/>
          <small class="h5 font-weight-light text-muted"> Position: {{ position }} </small>
        </h5>
        <button href="#" type="button" @click="getPlayerPage" class="btn btn-outline-info">Go to player page</button>
      </div>
    </b-card>
    <br/>
  </div>  
</template>

<script>
export default {
  name: "PlayerPreview",
  props: {
     playerID: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      team: {
        type: String,
        required: true
      },
      position: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      }
  },
  methods: {
     async getPlayerPage(){
      this.$router.push('/playerPage/'+ String(this.playerID));
     }
  },
  mounted(){
    console.log("player preview mounted")
  } 
};
</script>

<style>
.player-preview {
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

.player-preview .player-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.player-preview .player-content {
  width: 100%;
  overflow: hidden;
}
</style>

