import { expect, test } from "../fixtures/baseFixture";

test("Login to portal", async ({ homePage }) => {
  await expect(homePage.page).toHaveTitle("My Account");
});
