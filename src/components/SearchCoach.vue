<template>
  <b-container fluid>      
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Coaches</h1>
    </div>
    <b-row v-if="items" class="h5 font-weight-light text-muted">
      <b-col lg="6" class="my-1">
        <b-form-group
          class="h5 font-weight-light text-muted"
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="large" >

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
        <small class="h5 font-weight-light text-muted" style="font-size:18px">
        <b-form-group
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="large"
          class="mb-0"
          v-slot="{ ariaDescribedby }">
          
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1">
            <b-form-checkbox value="team_name">Team Name</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        </small>
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
      show-empty>

      <template #cell(image)="row">
        <img :src="row.item.image"
          class="card-img-bottom"
          style="height: 100px; width: auto"
          v-on:click.stop="getCoachPage(row.item.coachID)"/>
      </template>

      <template #cell(name)="row">
        <a href="#" v-on:click="getCoachPage(row.item.coachID)"> {{ row.item.firsName }} {{ row.item.lastName }}</a>
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
          { key: 'coachID', label: 'Coach ID', thStyle: { width: "10px" }},
          { key: 'name', label: 'Coach Name', sortable: true, thStyle: { width: "10px" }},
          { key: 'team_name', label: 'Team Name', sortable: true, thStyle: { width: "10px" }},
          { key: 'image', label: 'Image', thStyle: { width: "10px" }},
        ],
        filter: null,
        filterOn: [],
      }
    },
    methods: {
      async getCoachPage(coachID){
          this.$router.push('/coachPage/'+ String(coachID))
      }
    },
   
  }
</script>
