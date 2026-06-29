import { LoginPage } from "../pages/LoginPage";
import { test, expect } from "../fixtures/baseFixture";

const searchArray = [
  { searchKey: "macbook", count: 3 },
  { searchKey: "samsung", count: 2 },
];
for (let productArray of searchArray) {
  test(`Search Product ${productArray.searchKey}`, async ({ homePage }) => {
    let searchProduct = await homePage.searchProduct(productArray.searchKey);
    expect(await searchProduct.numberofProduct()).toBe(productArray.count);
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
