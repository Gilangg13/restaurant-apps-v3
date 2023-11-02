/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
// import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";
import FavoriteRestaurantIdb from "../data/favorite-restaurant-idb";
import {
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
} from "../views/templates/template-creator";

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;
    this._favoriteRestaurants = FavoriteRestaurantIdb;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurants.getRestaurant(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeRestaurantButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await this._favoriteRestaurants.putRestaurant(this._restaurant);
      this._renderButton();
      // console.log("Restaurant di Like");
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML =
      createUnlikeRestaurantButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id);
      this._renderButton();
      // console.log("Restaurant di Unlike");
    });
  },
};

export default LikeButtonPresenter;
