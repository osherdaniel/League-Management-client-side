<template> 
  <div>
    <div class="container">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 class="display-4">League Home Page</h1>
        </div>

        <b-card-group deck class="justify-content-center">
          <LeagueInfo style="min-width: 40rem;"></LeagueInfo>
          <LoginPage  style="min-width: 40rem;" v-if="!$root.store.username"></LoginPage>
          <FavoritesGameForHome v-else-if="$root.store.teams && $root.store.referees" style="min-width: 40rem;"></FavoritesGameForHome>
        </b-card-group>

    </div>
  </div>  
</template>

<script>
import LeagueInfo from "../components/LeagueInfo";
import FavoritesGameForHome from "../components/FavoritesGameForHome";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    LeagueInfo, 
    LoginPage, 
    FavoritesGameForHome
  },
};
</script>

<style lang="scss">

</style>
