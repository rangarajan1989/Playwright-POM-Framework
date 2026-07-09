import { Browser, Locator, Page } from "@playwright/test";
import { ElementUtil } from "../util/ElementUtil";
import { ProductPage } from "../pages/ProductPage";
import { title } from "node:process";
export class ResultPage {
  private readonly page: Page;
  private readonly elu: ElementUtil;
  private readonly productNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elu = new ElementUtil(page);
    this.productNumber = page.locator("div.product-thumb");
  }

  async numberofProduct(): Promise<number> {
    return await this.productNumber.count();
    console.log(`Product is successfully searched`);
  }

  async clickonProduct(pName: string): Promise<ProductPage> {
    await this.elu.click(this.page.getByRole("link", { name: `${pName}` }));
    //await this.page.waitForTimeout(3000);
    return new ProductPage(this.page);
  }
}
