/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable class-methods-use-this */
/* eslint-disable operator-linebreak */
/* eslint-disable no-undef */
// eslint-disable-next-line object-curly-newline
import FavoriteRestaurantSearchPresenter from "../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter";
import FavoriteRestaurantView from "../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view";

describe("Searching Restaurants", () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById("query");
    queryElement.value = query;

    queryElement.dispatchEvent(new Event("change"));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe("When query is not empty", () => {
    it("should be able to capture the query typed by the user", () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants("restaurant a");

      expect(presenter.latestQuery).toEqual("restaurant a");
    });

    it("should ask the model to search for liked restaurants", () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants("restaurant a");

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith(
        "restaurant a"
      );
    });

    it("should show the restaurants found by Favorite Restaurants", (done) => {
      document
        .getElementById("restaurants")
        .addEventListener("restaurants:updated", () => {
          expect(document.querySelectorAll(".restaurant-item").length).toEqual(
            3
          );

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === "restaurant a") {
          return [
            { id: 111, title: "restaurant abc" },
            { id: 222, title: "ada juga restaurant abcde" },
            { id: 333, title: "ini juga boleh restaurant a" },
          ];
        }

        return [];
      });

      searchRestaurants("restaurant a");
    });

    // it("should show the name of the restaurants found by Favorite Restaurants", () => {
    //   document
    //     .getElementById("restaurants")
    //     .addEventListener("restaurants:updated", () => {
    //       const restaurantTitles = document.querySelectorAll(
    //         ".restaurant__title a"
    //       );

    //       expect(restaurantTitles.item(0).textContent).toEqual(
    //         "restaurant abc"
    //       );
    //       expect(restaurantTitles.item(1).textContent).toEqual(
    //         "ada juga restaurant abcde"
    //       );
    //       expect(restaurantTitles.item(2).textContent).toEqual(
    //         "ini juga boleh restaurant a"
    //       );
    //     });

    //   favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
    //     if (query === "restaurant a") {
    //       return [
    //         { id: 111, title: "restaurant abc" },
    //         { id: 222, title: "ada juga restaurant abcde" },
    //         { id: 333, title: "ini juga boleh restaurant a" },
    //       ];
    //     }

    //     return [];
    //   });

    //   searchRestaurants("restaurant a");
    // });

    it("should show the name of the restaurants found by Favorite Restaurants", async () => {
      // Buat promise yang akan menunggu event "restaurants:updated"
      const restaurantsUpdatedPromise = new Promise((resolve) => {
        document
          .getElementById("restaurants")
          .addEventListener("restaurants:updated", () => {
            resolve();
          });
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === "restaurant a") {
          return [
            { id: 111, title: "restaurant abc" },
            { id: 222, title: "ada juga restaurant abcde" },
            { id: 333, title: "ini juga boleh restaurant a" },
          ];
        }

        return [];
      });

      searchRestaurants("restaurant a");

      // Tunggu hingga event "restaurants:updated" terjadi
      await restaurantsUpdatedPromise;

      // Setelah event "restaurants:updated" terjadi,
      // periksa elemen-elemen dengan teks yang diharapkan
      const restaurantTitles = document.querySelectorAll(".restaurant__title");
      expect(restaurantTitles.item(0).textContent).toEqual("restaurant abc");
      expect(restaurantTitles.item(1).textContent).toEqual(
        "ada juga restaurant abcde"
      );
      expect(restaurantTitles.item(2).textContent).toEqual(
        "ini juga boleh restaurant a"
      );
    });

    it("should show - when the restaurant returned does not contain a title", (done) => {
      document
        .getElementById("restaurants")
        .addEventListener("restaurants:updated", () => {
          const restaurantTitles =
            document.querySelectorAll(".restaurant__title");

          expect(restaurantTitles.item(0).textContent).toEqual("-");

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === "restaurant a") {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants("restaurant a");
    });
  });

  describe("When query is empty", () => {
    it("should capture the query as empty", () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(" ");
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants("    ");
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants("");
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants("\t");
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it("should show all favorite restaurants", () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants("    ");

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe("When no favorite restaurants could be found", () => {
    it("should show the empty message", (done) => {
      document
        .getElementById("restaurants")
        .addEventListener("restaurants:updated", () => {
          expect(
            document.querySelectorAll(".restaurant-item__not__found").length
          ).toEqual(1);

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants("restaurant a");
    });

    it("should not show any restaurant", (done) => {
      document
        .getElementById("restaurants")
        .addEventListener("restaurants:updated", () => {
          expect(document.querySelectorAll(".restaurant-item").length).toEqual(
            0
          );

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants("restaurant a");
    });
  });
});
