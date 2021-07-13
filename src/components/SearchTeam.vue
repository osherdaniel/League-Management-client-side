<template>
  <b-container fluid>      
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Teams</h1>
    </div>

    <b-table align="center" justify="center"
      class="h5 font-weight-light text-muted"
      :items="items"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="filterOn"
      stacked="md"
      show-empty
      max-width=500px>

      <template #cell(logo_path)="row">
        <img :src="row.item.logo_path"
          class="card-img-bottom"
          style="height: 100px; width: auto"
          v-on:click.stop="getTeamPage(row.item.teamID)"/>
      </template>

      <template #cell(name)="row">
        <a href="#" v-on:click="getTeamPage(row.item.teamID)"> {{ row.item.name }}</a>
      </template>
    </b-table>
  </b-container>
</template>

<script>
  export default {
     props: {
          items: {
          type: Array,
          required: false
          }
     },
     data() {
      return {
        fields: [
          { key: 'teamID', label: 'Team ID', },
          { key: 'name', label: 'Team Name', sortable: true },
          { key: 'logo_path', label: 'Logo' },
        ],
        filter: null,
        filterOn: [],
      }
    },
    methods: {
      async getTeamPage(teamID){
        this.$router.push('/teamPage/'+ String(teamID))
      }
    },
   
  }
</script>
