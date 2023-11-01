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

Scenario("searching restaurants", async ({ I }) => {
  I.see(
    "Tidak ada restaurant untuk ditampilkan",
    ".restaurant-item__not__found"
  );

  I.amOnPage("/");

  I.seeElement(".restaurant__title a");

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate(".restaurant__title a").at(i));

    I.seeElement("#likeButton");
    I.click("#likeButton");

    I.amOnPage("/");
    titles.push(await I.grabTextFrom(locate(".restaurant__title a").at(i)));
  }

  I.amOnPage("/#/favorite");
  I.seeElement("#query");

  const visibleLikeRestaurants = await I.grabNumberOfVisibleElements(
    ".restaurant-item"
  );

  assert.strictEqual(titles.length, visibleLikeRestaurants);

  const searchQuery = titles[1].substring(1, 3);

  I.fillField("#query", searchQuery);
  I.pressKey("Enter");

  // mendapatkan daftar restaurant yang sesuai dengan searchQuery
  const matchingRestaurants = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements(
    ".restaurant-item"
  );

  assert.strictEqual(
    matchingRestaurants.length,
    visibleSearchedLikedRestaurants
  );

  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleTitle = await I.grabTextFrom(
      locate(".restaurant__title").at(i + 1)
    );

    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.wait(2);
  await likingRestaurant({ I });

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item-content');
  I.click('.restaurant-item-content a');
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/favorite');
  I.see('Restoran Favorit', '.content-heading');
});
