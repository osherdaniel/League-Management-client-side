<template>
  <div>
    <div class="h5 font-weight-light text-muted text-left">
      <b class="font-weight-light text-muted">Event:</b>
    </div>
    <ul class="font-weight-light text-muted text-left">
      <li> Event time: {{ event_time }} </li>
      <li> Minute in the game: {{ minute}} </li>
      <li> Description: {{ event_description }} </li>
      <li> Type: {{ type }} </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: {
      event_time: {
        type: String,
        required: true
      },
      minute: {
        type: Number,
        required: true
      },
      event_description: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
  }, 
  mounted(){
    console.log("event preview mounted")
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
