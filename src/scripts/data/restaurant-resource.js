import RESTAURANT_API_ENDPOINT from "../globals/api-endpoint";

class RestaurantSource {
  static async listRestaurant() {
    try {
      const response = await fetch(RESTAURANT_API_ENDPOINT.RESTAURANT_LIST);
      const responseJson = await response.json();
      // return responseJson;
      return responseJson.restaurants;
    } catch (error) {
      console.error(`Error fetching restaurant list: ${error}`);
      throw error;
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(
        RESTAURANT_API_ENDPOINT.RESTAURANT_DETAIL(id)
      );
      const responseJson = await response.json();
      // return responseJson;
      return responseJson.restaurant;
    } catch (error) {
      console.error(`Error fetching restaurant list: ${error}`);
      throw error;
    }
  }

  static async postReview(review) {
    const response = await fetch(RESTAURANT_API_ENDPOINT.RESTAURANT_REVIEW, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    const responseJson = await response.json();
    // return responseJson;
    return responseJson.customerReviews;
  }
}

export default RestaurantSource;
