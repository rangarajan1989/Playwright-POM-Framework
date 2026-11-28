import { test, expect } from "../fixtures/baseFixture";

const searchArray = [
  { searchKey: "macbook", count: 3 },
  { searchKey: "samsung", count: 2 },
];
for (const productArray of searchArray) {
  test(`@regression Search Product ${productArray.searchKey}`, async ({
    homePage,
  }) => {
    const searchProduct = await homePage.searchProduct(productArray.searchKey);

    await expect
      .poll(async () => await searchProduct.numberofProduct(), {
        message: `Waiting for product grid count for "${productArray.searchKey}"`,
        timeout: 15000,
        intervals: [500],
      })
      .toBe(productArray.count);
  });
}
test(`@regression Click on Product and get image count`, async ({
  homePage,
}) => {
  let searchProduct = await homePage.searchProduct("macbook");
  let productPage = await searchProduct.clickonProduct("MacBook Pro");
  expect(await productPage.countProductImages()).toBe(4);
});

test(`@regression Get Product MetaData`, async ({ homePage }) => {
  let searchProduct = await homePage.searchProduct("macbook");
  let productPage = await searchProduct.clickonProduct("MacBook Pro");
  await productPage.printproductDetails();
});
