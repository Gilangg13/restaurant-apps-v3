/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */

const assert = require("assert");

Feature("Liking Restaurants");

Before(({ I }) => {
  I.amOnPage("/#/favorite");
});

const likingRestaurant = async ({ I }) => {
  I.see(
    "Tidak ada restaurant untuk ditampilkan",
    ".restaurant-item__not__found"
  );

  I.amOnPage("/");

  I.seeElement(".restaurant__title a");
  I.wait(2);
  const firstRestaurant = locate(".restaurant__title a").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.seeElement(".restaurant-item");
  const likedRestaurantTitle = await I.grabTextFrom(".restaurant__title");

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
};

Scenario("show empty liked restaurants", ({ I }) => {
  I.seeElement("#query");

  I.see(
    "Tidak ada restaurant untuk ditampilkan",
    ".restaurant-item__not__found"
  );
});

Scenario("liking one restaurant", async ({ I }) => {
  I.wait(3);
  await likingRestaurant({ I });
});

Scenario("Unliking one restaurant", async ({ I }) => {
  I.wait(2);
  await likingRestaurant({ I });

  I.amOnPage("/#/favorite");

  I.seeElement(".restaurant-item-content");
  I.click(".restaurant-item-content a");

  I.seeElement("#likeButton");
  I.click("#likeButton");

  I.amOnPage("/#/favorite");
  I.see("Your Liked Restaurant", ".content-heading");
});
