import { Browser, Locator, Page } from "@playwright/test";
import { ElementUtil } from "../util/ElementUtil";
import { title } from "node:process";
import { HomePage } from "./HomePage";
export class ProductPage {
  private readonly page: Page;
  private readonly elu: ElementUtil;
  private readonly imageCount: Locator;
  private readonly productHeader: Locator;
  private readonly productDetails: Locator;
  private readonly productPrice: Locator;
  private readonly productMap = new Map<string, string | number | null>();

  constructor(page: Page) {
    this.page = page;
    this.elu = new ElementUtil(page);
    this.imageCount = page.locator("div.col-sm-8 ul.thumbnails li a");
    this.productHeader = page.locator("h1");
    this.productDetails = page.locator(
      `(//div[@class='col-sm-4']//ul[@class='list-unstyled'])[1]/li`,
    );
    this.productPrice = page.locator(
      `(//div[@class='col-sm-4']//ul[@class='list-unstyled'])[2]/li`,
    );
  }

  async countProductImages(): Promise<number> {
    return await this.imageCount.count();
  }

  private async returnmetadataofProduct() {
    this.productMap.set("ProductName", await this.productHeader.innerText());
    let product: string[] = await this.productDetails.allInnerTexts();
    for (let p of product) {
      const metaKey = p.split(":")[0].trim();
      const metaValue = p.split(":")[1].trim();
      this.productMap.set(metaKey, metaValue);
    }
  }

  private async returproductPrice() {
    const productPricing: string[] = await this.productPrice.allInnerTexts();
    const productPrice = productPricing[0].trim();
    const productExTax = productPricing[1].split(":")[1].trim();

    this.productMap.set("price", productPrice);
    this.productMap.set("extaxprice", productExTax);
  }

  async printproductDetails() {
    await this.returnmetadataofProduct();
    await this.returproductPrice();
    this.productMap.set("Images", await this.countProductImages());
    for (let [key, value] of this.productMap) {
      console.log(`${key}: ${value}`);
    }
  }
}
