/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
import RestaurantSource from "../../data/restaurant-resource";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Home = {
  async render() {
    return `
      <section class="hero">
        <picture>
          <source class="lazyload" media="(min-width:600px)" srcset="./images/hero-image_4-large.jpg" type="image/webp">
          <source class="lazyload" media="(min-width:600px)" srcset="./images/hero-image_4-large.jpg" type="image/jpg">

          <source class="lazyload" media="(max-width:600px)" srcset="./images/hero-image_4-small.jpg" type="image/webp">
          <source class="lazyload" media="(max-width:600px)" srcset="./images/hero-image_4-small.jpg" type="image/jpg">
          <img class="lazyload" data-src="./images/hero-image_4.jpg" alt="Gambar Restaurant" >
        </picture>

        <div class="hero-content">
          <div class="hero-title">Selamat Datang di Foodie Apps.</div>
          <div class="hero-tagline">Jelajahi Restoran Terbaik di Sekitar Anda</div>
          <a href="#mainContent" class="hero-button">Explore Restaurant</a>
        </div>
      </section>

      <div class="content">
        <h2 class="content-heading">Explore Restaurant</h2>
        <div id="restaurants" class="restaurants">
            
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurant();
    const restaurantsContainer = document.querySelector("#restaurants");

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML +=
        createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
