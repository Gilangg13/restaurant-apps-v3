/* eslint-disable no-undef */
import { spyOn } from "jest-mock";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";
import * as TestFactories from "./helpers/testFactories";

describe("Liking A Restaurant", () => {
  if (typeof structuredClone === "undefined") {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
  }

  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();

    spyOn(FavoriteRestaurantIdb, "searchRestaurants");
  });

  it("should show the like button when the restaurant has not been like before", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });

  it("should not show the unlike button when the restaurant has not been liked before", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeFalsy();
  });

  it("should be able to like the restaurant", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // menyimulasikan widget ditekan
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    // memastikan restaurant berhasil disukai
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it("should not add a restaurant again when its already liked", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    // Simulasikan pengguna menekan tombol suka film
    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);

    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it("should not add a restaurant when it has no id", async () => {
    await TestFactories.createLikeButtonPresenterWithRestaurant({});

    document.querySelector("#likeButton").dispatchEvent(new Event("click"));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
