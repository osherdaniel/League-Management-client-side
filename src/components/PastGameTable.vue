<template>
  <div class="container">
    <b-table hover :fields="past_games_field" :items="past_games" class="font-weight-light text-muted" style="font-size:16px">
          <template #cell(events)="row">
               <EventPreview
                    v-for="(e,index) in row.item.events"
                    :event_time="e.event_time"
                    :minute="e.minute" 
                    :event_description="e.event_description" 
                    :type="e.type" 
                    :key="index"></EventPreview>  
          </template>
          <template #cell(home_team)="row">
               <a href="#" v-on:click="getTeamPage(row.item.homeTeamID)"> {{ row.item.home_team }}</a>
          </template>
          <template #cell(away_team)="row">
               <a href="#" v-on:click="getTeamPage(row.item.awayTeamID)"> {{ row.item.away_team }}</a>
          </template>
    </b-table>
  </div>
</template>

<script>
import EventPreview from "./EventPreview.vue";
export default {
  name: "PastGameTable",
  components: {
    EventPreview
  }, 
  props: {
     past_games: {
          type: Array,
          required: true
     }
  },
  data() {
    return {
      past_games_field:[
        { key: 'gameID', label: 'Game ID' },
        { key: 'game_time', label: 'Time' },
        { key: 'home_result', label: 'Home Result' },
        { key: 'away_result', label: 'Away Result' },
        { key: 'field', label: 'Field' },
        { key: 'game_date', label: 'Date' },
        { key: 'referee_name', label: 'Referee' },
        { key: 'home_team', label: 'Home Team' },
        { key: 'away_team', label: 'Away Name' },
        { key: 'events', label: 'Events' },
      ]
     }
  },
  methods: {
     async getTeamPage(teamID){
          this.$router.push('/teamPage/'+ String(teamID))
     }
  },
  mounted(){
    console.log("game preview mounted")
  } 
};
</script>

<style>
  .container {
    background-image: none;
  }

</style>
