import { Browser, Locator, Page } from "@playwright/test";
import { ElementUtil } from "../util/ElementUtil";
import { title } from "node:process";
import { HomePage } from "./HomePage";
import { RegisterPage } from "./RegisterPage";
export class LoginPage {
  private readonly page: Page;
  private readonly elu: ElementUtil;
  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elu = new ElementUtil(page);
    this.emailId = page.getByRole("textbox", { name: "E-Mail Address" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.locator(`input[value='Login']`);
    this.registerLink = page.getByRole("link", { name: "Register" });
  }

  async navigatetoLogin(baseURL: string | undefined) {
    await this.page.goto(baseURL + "?route=account/login");
  }

  async logintohomePage(email: string, password: string): Promise<HomePage> {
    await this.elu.fill(this.emailId, email);
    await this.elu.fill(this.password, password);
    await this.elu.click(this.loginButton);
    let titlePage = await this.page.title();
    return new HomePage(this.page);
  }
  async gotoRegistration(): Promise<RegisterPage> {
    await this.elu.click(this.registerLink);
    return new RegisterPage(this.page);
  }
}
