import { Browser, Locator, Page } from "@playwright/test";
import { ElementUtil } from "../util/ElementUtil";
import { title } from "node:process";
import { ResultPage } from "./ResultPage";
export class HomePage {
  readonly page: Page;
  private readonly elu: ElementUtil;
  private readonly logOut: Locator;
  private readonly searchText: Locator;
  private readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elu = new ElementUtil(page);
    this.logOut = page.getByRole("link", { name: "Logout" });
    this.searchText = page.getByPlaceholder("Search");
    this.searchButton = page.locator(
      `div#search>span button.btn.btn-default.btn-lg`,
    );
  }

  async isUserLoggedIn(): Promise<boolean> {
    return await this.elu.isVisible(this.logOut, 0);
  }

  async logoutofHomePage() {
    await this.elu.click(this.logOut, { force: true });
    console.log(`Logged Out successfully`);
  }

  async searchProduct(product: string): Promise<ResultPage> {
    await this.elu.fill(this.searchText, product);
    await this.elu.click(this.searchButton, { force: true, timeout: 4000 });
    return new ResultPage(this.page);
  }
}
