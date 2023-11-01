/* eslint-disable no-new */
/* eslint-disable operator-linebreak */
import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import FavoriteRestaurantView from "./liked-restaurant/favorite-restaurant-view";
import FavoriteRestaurantShowPresenter from "./liked-restaurant/favorite-restaurant-show-presenter";
import FavoriteRestaurantSearchPresenter from "./liked-restaurant/favorite-restaurant-search-presenter";

const view = new FavoriteRestaurantView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });

    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });

    // const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    // const restaurantsContainer = document.querySelector("#restaurants");
    // const noFavoriteMessage = document.querySelector("#noFavoriteMessage");

    // if (restaurants.length === 0) {
    //   noFavoriteMessage.style.display = "block";
    // } else {
    //   noFavoriteMessage.style.display = "none";
    // }

    // restaurants.forEach((restaurant) => {
    //   restaurantsContainer.innerHTML +=
    //     createRestaurantItemTemplate(restaurant);
    // });
  },
};

export default Like;
