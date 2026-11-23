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
    this.logOut = page.getByRole("link", { name: "Logout", exact: true });
    this.searchText = page.getByPlaceholder("Search");
    this.searchButton = page.getByRole("button").filter({ hasText: /^$/ });
    //getByRole('button').filter({ hasText: /^$/ })
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
    await this.elu.click(this.searchButton);

    return new ResultPage(this.page);
  }
}
