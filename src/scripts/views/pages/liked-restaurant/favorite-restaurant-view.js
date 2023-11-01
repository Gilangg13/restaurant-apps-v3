/* eslint-disable operator-linebreak */

import { createRestaurantItemTemplate } from "../../templates/template-creator";

/* eslint-disable class-methods-use-this */
class FavoriteRestaurantView {
  getTemplate() {
    return `
    <div class="content">
        <div class="search">
          <input id="query" type="text" placeholder="Cari Restaurant">
          <i class="fa-solid fa-magnifying-glass"></i>
        
        </div>
        <h2 class="content-heading">Your Liked Restaurant</h2>
      
        <div id="restaurants" class="restaurants">
        </div>
    </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById("query").addEventListener("change", (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;

    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(createRestaurantItemTemplate(restaurant)),
        ""
      );
    } else {
      html = this._getEmptyRestaurantsTemplate();
    }

    document.getElementById("restaurants").innerHTML = html;

    document
      .getElementById("restaurants")
      .dispatchEvent(new Event("restaurants:updated"));
  }

  _getEmptyRestaurantsTemplate() {
    return `
        <div class="restaurant-item__not__found">
            Tidak ada restaurant untuk ditampilkan
        </div>
    `;
  }
}

export default FavoriteRestaurantView;
