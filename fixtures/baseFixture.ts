import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

type MyFixture = {
  homePage: HomePage;
};

export const test = base.extend<MyFixture>({
  homePage: async ({ page, baseURL }, use) => {
    const loginPage = new LoginPage(page);

    // Wait for navigation to complete
    await loginPage.navigatetoLogin(baseURL);

    const userName = process.env.APP_USER_NAME;
    const password = process.env.APP_PASSWORD;

    if (!userName || !password) {
      throw new Error("APP_USER_NAME or APP_PASSWORD is missing.");
    }

    const homePage = await loginPage.logintohomePage(userName, password);
    expect(await homePage.isUserLoggedIn()).toBeTruthy();
    await use(homePage);
  },
});
export { expect };
