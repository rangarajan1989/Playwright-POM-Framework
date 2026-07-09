import { test as baseTest, expect } from "@playwright/test";
import { ApiHelper } from "../tests/api/ApiHelper";

type ApiFixtures = {
  apiHelper: ApiHelper;
};

export let test = baseTest.extend<ApiFixtures>({
  apiHelper: async ({ request }, use) => {
    const apiHelper = new ApiHelper(request, process.env.API_URL!);
    await use(apiHelper);
  },
});

export { expect };
