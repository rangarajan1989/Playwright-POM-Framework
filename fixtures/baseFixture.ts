import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

type MyFixture = {
  homePage: HomePage;
};

export const test = base.extend<MyFixture>({
  homePage: async ({ page, baseURL }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    loginPage.navigatetoLogin(baseURL);
    const userName = testInfo.project.metadata.appUserName;
    const password = testInfo.project.metadata.appPassWord;

    let homePage = await loginPage.logintohomePage(userName, password);
    //await page.waitForTimeout(4000);
    expect(homePage.isUserLoggedIn()).toBeTruthy();

    await use(homePage);
  },
});

export { expect };
