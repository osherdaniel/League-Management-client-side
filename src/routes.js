import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/favoritesGames",
    name: "favoritesGames",
    component: () => import("./pages/FavoritesGamesPage")
  },
  {
    path: "/favoritesPlayers",
    name: "favoritesPlayers",
    component: () => import("./pages/FavoritesPlayersPage")
  },
  {
    path: "/favoritesTeams",
    name: "favoritesTeams",
    component: () => import("./pages/FavoritesTeamPage")
  },
  {
    path: "/playerPage/:playerID",
    name: "playerPage",
    props: true,
    component: () => import("./pages/PlayerPage")
  },
  {
    path: "/coachPage/:coachID",
    name: "coachPage",
    component: () => import("./pages/CoachPage")
  },
  {
    path: "/teamPage/:teamID",
    name: "teamPage",
    component: () => import("./pages/TeamPage")
  },
  {
    path: "/addResult/:gameID",
    name: "addResult",
    component: () => import("./pages/AddResultGame")
  },
  {
    path: "/addEvent/:gameID",
    name: "addEvent",
    component: () => import("./pages/AddEventGame")
  },
  {
    path: "/leagueGames",
    name: "leagueGames",
    component: () => import("./pages/LeagueGames")
  },
  {
    path: "/manageLeague",
    name: "manageLeague",
    component: () => import("./pages/ManageLeague")
  },
  {
    path: "/addGame",
    name: "addGame",
    component: () => import("./pages/AddGame")
  },
  {
    path: "/addReferee",
    name: "addReferee",
    component: () => import("./pages/AddReferee")
  },
  {
    path: "/removeReferee",
    name: "removeReferee",
    component: () => import("./pages/RemoveReferee")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  { 
    path: '/404', 
    component: NotFound 
  },  
  {
    path: "*",
    name: "notFound",
    component: NotFound
  },
];

export default routes;
