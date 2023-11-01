import Home from "../views/pages/home";
import DetailRestaurant from "../views/pages/detail";
import Favorite from "../views/pages/favorite";

const routes = {
  "/": Home,
  "/home": Home,
  "/favorite": Favorite,
  "/detail/:id": DetailRestaurant,
};

export default routes;
