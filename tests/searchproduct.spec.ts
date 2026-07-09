import { LoginPage } from "../pages/LoginPage";
import { test, expect } from "../fixtures/baseFixture";

const searchArray = [
  { searchKey: "macbook", count: 3 },
  { searchKey: "samsung", count: 2 },
];
for (let productArray of searchArray) {
  test(`Search Product ${productArray.searchKey}`, async ({ homePage }) => {
    let searchProduct = await homePage.searchProduct(productArray.searchKey);
    await expect
      .poll(
        async () => {
          return await searchProduct.numberofProduct();
        },
        {
          message:
            "Waiting for product grid count to match search array expectations",
          timeout: 7000, // Polls for up to 7 seconds before failing
          intervals: [500], // Re-checks every 500 milliseconds
        },
      )
      .toBe(productArray.count);
    //expect(await searchProduct.numberofProduct()).toEqual(productArray.count);
  });
}

test(`Click on Product and get image count`, async ({ homePage }) => {
  let searchProduct = await homePage.searchProduct("macbook");
  let productPage = await searchProduct.clickonProduct("MacBook Pro");
  expect(await productPage.countProductImages()).toBe(4);
});

test(`Get Product MetaData`, async ({ homePage }) => {
  let searchProduct = await homePage.searchProduct("macbook");
  let productPage = await searchProduct.clickonProduct("MacBook Pro");
  await productPage.printproductDetails();
});
