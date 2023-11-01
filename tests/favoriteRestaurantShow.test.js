/* eslint-disable no-new */
import FavoriteRestaurantView from "../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view";
import FavoriteRestaurantShowPresenter from "../src/scripts/views/pages/liked-restaurant/favorite-restaurant-show-presenter";

/* eslint-disable no-undef */
describe("Showing all favorite restaurants", () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe("When no restaurants have been liked", () => {
    it("should render the information that no restaurant has been liked", () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      const restaurants = [];
      presenter._displayRestaurants(restaurants);

      expect(
        document.querySelectorAll(".restaurant-item__not__found").length
      ).toEqual(1);
    });

    it("should ask for the favorite restaurants", () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe("When favorite restaurants exist", () => {
    it("should show the restaurant", (done) => {
      document
        .getElementById("restaurants")
        .addEventListener("restaurants:updated", () => {
          expect(document.querySelectorAll(".restaurant-item").length).toEqual(
            2
          );

          done();
        });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: "A",
            rating: 3,
            description: "Sebuah restaurant A",
          },
          {
            id: 22,
            name: "B",
            rating: 4,
            description: "Sebuah restaurant B",
          },
        ]),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
