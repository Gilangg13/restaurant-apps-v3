/* eslint-disable no-alert */
import UrlParser from "../../routes/url-parser";
import RestaurantSource from "../../data/restaurant-resource";
import {
  createRestaurantDetailTemplate,
  createMenuTemplate,
  createCustomerReviewTemplate,
} from "../templates/template-creator";

import LikeButtonPresenter from "../../utils/like-button-presenter";
import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";

const DetailRestaurant = {
  async render() {
    return `
    <div class="content-detail">
        <div id="favoriteButtonContainer"></div>
        <section id="restaurant-detail" class="restaurant-detail"></section>

        <section class="restaurant-menu">
          <h3 class="restaurant-menu-title">Daftar Menu</h3>

          <h4 class="restaurant-menu-subtitle">Makanan</h4>
          <div id="food-menu" class="restaurant-menu-content"></div>

          <h4 class="restaurant-menu-subtitle">Minuman</h4>
          <div id="drink-menu" class="restaurant-menu-content"></div>
        </section>

        <section class="reviews">
          <h3 class="review-title">Customer Review</h3>
          <div id="reviews" class="reviews-list"></div>

          <h4 class="reviews-subtitle">Write a Review</h4>
          <form id="reviewForm" class="reviews-form">
              <div class="reviews-form-field">
                <label class="reviews-form-label" for="name">Nama</label>
                <input class="reviews-form-input" type="text" id="name" name="name" placeholder="Your name..." required>
              </div>
              <div class="reviews-form-field">
                <label class="reviews-form-label" for="review">Review</label>
                <input class="reviews-form-input" type="text" id="review" name="review" placeholder="Your Review" required>
              </div>
              <button class="reviews-form-submit" id="submit-review" type="submit">Send Review</button>
          </form>
        </section>
    </div>

    <div id="likeButtonContainer"></div>
       
    `;
  },

  async afterRender() {
    //
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);

    // render detail
    const restaurantContainer = document.querySelector("#restaurant-detail");
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    // render menu
    const foodMenu = document.querySelector("#food-menu");
    const drinkMenu = document.querySelector("#drink-menu");

    const { foods, drinks } = restaurant.menus;

    foodMenu.innerHTML = foods.map(createMenuTemplate).join("");
    drinkMenu.innerHTML = drinks.map(createMenuTemplate).join("");

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });

    //
    this._renderCustomerReviews(restaurant.customerReviews);

    const reviewForm = document.querySelector("#reviewForm");
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const nameInput = document.getElementById("name");
      const reviewInput = document.getElementById("review");

      const review = {
        id: restaurant.id,
        name: nameInput.value,
        review: reviewInput.value,
      };

      try {
        const updateCustomerReviews = await RestaurantSource.postReview(review);

        if (updateCustomerReviews) {
          this._renderCustomerReviews(updateCustomerReviews);

          nameInput.value = "";
          reviewInput.value = "";

          const offlineMessage = document.getElementById("offlineMessage");
          if (offlineMessage) {
            offlineMessage.style.display = "none";
          }

          reviewForm.reset();
        }
      } catch (error) {
        if (!window.navigator.onLine) {
          alert(
            "Anda sedang offline. Fitur 'Tambahkan Ulasan' tidak tersedia dalam mode offline."
          );
        } else {
          console.error("Failed to post review:", error);
        }
      }
    });
  },

  _renderCustomerReviews(customerReviews) {
    const reviewsContainer = document.querySelector("#reviews");
    reviewsContainer.innerHTML = customerReviews
      .map(createCustomerReviewTemplate)
      .join("");
  },
};

export default DetailRestaurant;
