<template>
  <div class="container" >
     <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 class="display-4">About Our Website</h1>
     </div>
     <p class="ml-auto h5 font-weight-bold text-muted text-center" style="font-size:20px">
       The site is about Superliga.
       <br/><br/>
       The site includes the functionality of:
       <br>
     </p>
     <p class="ml-auto h5 font-weight-light text-muted text-center" style="font-size:20px">
          1.Favorites players, teams and games of user <br/>
          2.Search player, coach and team by name <br/>
          3.Manage league for assoicaion representive<br/>
          4.Games of the league <br/>
     </p>

     <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center" >
          <h1 class="display-4" >About The Developers</h1>
     </div>  
     <p class="ml-auto h5 font-weight-light text-muted text-center" style="font-size:20px">
          Our team:
          Shahar Tal <br/>
          ID: 313163396 <br/>
          Email: shaharap@post.bgu.ac.il <br/><br/>

          Osher Daniel <br/>
          ID: 205602006 <br/>
          Email: oshermac@post.bgu.ac.il<br/>
     </p>
     <br/><br/>
     <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 class="display-4">Checkout Our other Sites:</h1>
     </div>  
     <b-row>
          <b-col>
               <a :href="shaharSite">
                    <b-img
                    thumbnail
                    rounded
                    fluid
                    :src="shaharSiteImage"
                    class="site-image"
                    ></b-img>
               </a> 
          </b-col>     
          <b-col>
                 <a :href="osherSite">
                    <b-img
                    thumbnail
                    rounded
                    fluid
                    :src="osherSiteImage"
                    class="site-image"
                    ></b-img>
               </a> 
          </b-col>
          <b-row>
          <b-col>
               <a :href="pacmanSite">
                    <b-img
                    thumbnail
                    rounded
                    fluid
                    :src="pacmanSiteImage"
                    class="site-image"
                    ></b-img>
               </a> 
          </b-col>
          </b-row>
     </b-row>
  </div>
</template>

// <script>



export default {
  name: "about",
  data() {
    return {
      pacmanSiteImage: require("../assets/packmanImageSite.jpg"),
      shaharSiteImage: require("../assets/shaharSiteImage.jpg"),
      osherSiteImage: require("../assets/osherSiteImage.jpeg"),
      shaharSite:
        "https://web-development-environments-2021.github.io/313163396/",
      osherSite:
        "https://web-development-environments-2021.github.io/205602006/",
      pacmanSite:
        "https://web-development-environments-2021.github.io/assignment2_313163396_205602006/"
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 80%;
}

.site-image {
  border-radius: 150px;
  padding: 10px;
  margin: 5px;
  filter: grayscale(45%);
  transition: all 0.7s ease-out;
}
.site-image:hover {
  border: 1px solid #777;
  filter: grayscale(0);
  transform: scale(1.01211352033886652036768955);
  transition-duration: 0.7s;
}
.titles {
  font-weight: bold;
  text-decoration: underline;
}

.bg
{
  background-color: #EFEFEF;
  border-radius: 25px;
  border-style: solid;
  border-color: darkgrey;
  padding: 20px;
}
.developer-images {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>
