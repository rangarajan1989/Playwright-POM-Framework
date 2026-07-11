import { log } from "console";
import { expect, test } from "../fixtures/baseFixture";
import { LoginPage } from "../pages/LoginPage";
import { parse } from "csv-parse/sync";
import fs from "fs";

type Dataschema = {
  firstName: string;
  lastName: string;
  telephone: string;
  password: string;
  subscribeNewsletter: string;
};
let fileContent = fs.readFileSync("./testdata/register.csv", "utf-8");
let registrationData: Dataschema[] = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
});
test("Login to portal", async ({ homePage }) => {
  await expect(homePage.page).toHaveTitle("My Account");
});

test("Login with invalid credentails", async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigatetoLogin(baseURL);
  await loginPage.logintohomePage(getRandomEmail(), "Light@123");
  expect(await loginPage.invalidLoginErrorMessage()).toContain("Warning");
});

for (let user of registrationData) {
  test(`Register Email ${user.firstName} `, async ({ page, baseURL }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigatetoLogin(baseURL);
    const register = await loginPage.gotoRegistration();

    await register.registerUser(
      user.firstName,
      user.lastName,
      getRandomEmail(),
      user.telephone,
      user.password,
      user.subscribeNewsletter,
    );
  });
}

function getRandomEmail(): string {
  return `auto${Date.now()}@gmail.com`;
}
