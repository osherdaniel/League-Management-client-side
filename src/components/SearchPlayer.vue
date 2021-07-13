<template>
  <b-container fluid>      
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Players</h1>
    </div>

    <b-row v-if="items">
      <b-col lg="6" class="my-1">
        <b-form-group
          class="h5 font-weight-light text-muted"
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="large">

          <b-input-group size="large">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          class="h5 font-weight-light text-muted"
          style="font-size:18px"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="large"
          v-slot="{ ariaDescribedby }">
          
          <b-form-checkbox-group
            class="h5 font-weight-light text-muted"
            style="font-size:18px"
            v-model="filterOn"
            :aria-describedby="ariaDescribedby">
            <b-form-checkbox value="position">Position</b-form-checkbox>
            <b-form-checkbox value="team">Team Name</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
    </b-row>

    <br/>

    <b-table
      class="h5 font-weight-light text-muted"
      :items="items"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="filterOn"
      stacked="md"
      show-empty
      width=300px>

      <template #cell(image)="row">
        <img :src="row.item.image"
          class="card-img-bottom"
          style="height: 100px; width: auto"
          v-on:click.stop="getPlayerPage(row.item.playerID)"/>
      </template>

      <template #cell(name)="row">
        <a href="#" v-on:click="getPlayerPage(row.item.playerID)"> {{ row.item.name }}</a>
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
          { key: 'playerID', label: 'Player ID'},
          { key: 'name', label: 'Player Name', sortable: true},
          { key: 'team', label: 'Team Name', sortable: true},
          { key: 'position', label: 'Position', sortable: true},
          { key: 'image', label: 'Image'},
        ],
        filter: null,
        filterOn: [],
      }
    },
    methods: {
      async getPlayerPage(playerID){
        this.$router.push('/playerPage/'+ String(playerID))
      }
    },
   
  }
</script>

<style lang="scss" scoped>
  .table .bTableThStyle {
    max-width: 12rem;
    text-overflow: ellipsis;
  }
</style>