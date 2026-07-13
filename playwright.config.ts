import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const caps = {
  browser: "chrome",
  browser_version: "latest",
  os: "Windows",
  os_version: "11",
  name: "Playwright POM Framework Tests",
  build: "Build-1.0",
  "browserstack.username": process.env.BROWSERSTACK_USERNAME || "",
  "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY || "",
};
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    ["json", { outputFile: "playwright-report/results.json" }], // 🔥 Add this line
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: "on-first-retry",
    headless: !!process.env.CI,
    video: "on",
    baseURL: "https://naveenautomationlabs.com/opencart/index.php",
  },

  metadata: {
    appUserName: "raghu@gmail.com",
    appPassWord: "Light@1234",
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    {
      name: "Google Chrome",
      use: {
        channel: "chrome",
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
          ignoreDefaultArgs: ["--window-size=1280,720"],
        },
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
