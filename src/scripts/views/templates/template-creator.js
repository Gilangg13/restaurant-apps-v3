import RESTAURANT_API_ENDPOINT from "../../globals/api-endpoint";

const createCategoryTemplate = (categories) => {
  if (!categories || categories.length === 0) {
    return "";
  }

  return categories.map((category) => `<span>${category.name}</span>`);
};

const createRestaurantDetailTemplate = (restaurant) => `

  <img class="lazyload restaurant-detail-poster" alt="${restaurant.name}"
           data-src="${RESTAURANT_API_ENDPOINT.RESTAURANT_IMAGE(
             "small",
             restaurant.pictureId
           )}">

    <div class="restaurant-detail-content">

        <h2 class="restaurant-detail-title">${restaurant.name}</h2>

        <table class="restaurant-detail-table">
            <tbody>
                <tr>
                    <th>
                        <i class="fa fa-solid fa-star"></i>
                        <span>Rating</span>
                    </th>
                    <td>${restaurant.rating}</td>
                </tr>

                <tr>
                    <th>
                        <i class="fa fa-building"></i>
                        <span>City</span>
                    </th>
                    <td>${restaurant.city}</td>
                </tr>

                <tr>
                    <th>
                        <i class="fa fa-map-marker"></i>
                        <span>Address</span>
                    </th>
                    <td>${restaurant.address}</td>
                </tr>

                <tr>
                    <th>
                        <i class="fa fa-solid fa-tag"></i>
                        <span>Categories</span>
                    </th>
                    <td>${createCategoryTemplate(restaurant.categories)}</td>
                </tr>
            </tbody>
        </table>
         <div class="restaurant-detail-description">
            <h3>Description</h3>
            <p>${restaurant.description}</p>
        </div>
    </div>
       
`;

const createMenuTemplate = (menu) => `
    <article class="menu-item">
        <span class="menu-item-title">${menu.name}</span>
    </article>
`;

const createRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-item">
        <div class="restaurant-item-header">
            <img class="lazyload restaurant-item-header-poster"" alt="${
              restaurant.name
            }" 
                data-src="${RESTAURANT_API_ENDPOINT.RESTAURANT_IMAGE(
                  "small",
                  restaurant.pictureId
                )}">

            <div class="restaurant-item-header-rating">
                <p><i class="fa fa-solid fa-star" style="color: #ffd43b;"></i><span class="restaurant-item-header-rating-score">${
                  restaurant.rating || "-"
                }</span></p>
            </div>
        </div>
    
        <div class="restaurant-item-content">
            <h3 class="restaurant__title"><a href="/#/detail/${
              restaurant.id
            }">${restaurant.name || "-"}</a></h3>
            <div class="location">
                <i class="fa fa-map-marker"></i><span class="location">${
                  restaurant.city || "-"
                }</span>
            </div>
            
            <p>${restaurant.description || "-"}</p>
        </div>
    </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createCustomerReviewTemplate = (customerReview) => `
  <article class="review-item">
    <div class="review-item-header">
      <strong class="review-item-name">${customerReview.name}</strong>
      <span class="review-item-date">${customerReview.date}</span>
    </div>
    <p class="review-item-content">${customerReview.review}</p>
  </article>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createMenuTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createCustomerReviewTemplate,
};
