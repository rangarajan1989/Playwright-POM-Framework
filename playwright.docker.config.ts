import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  /* 🚀 FIX 1: Drop worker threads to 2 or 3 inside Docker containers.
    This prevents memory starvation and allows the CPU cores to process tests smoothly.
  */
  workers: 2,

  /* ⏱️ FIX 2: Increase test timeout execution limits.
    Containers take longer to initialize virtual viewports. Give them 60 or 90 seconds.
  */
  timeout: 60 * 1000,

  reporter: [
    ["html"],
    ["list"],
    [
      "playwright-html-reporter",
      {
        testFolder: "tests",
        title: "OPEN CART Docker Report",
        project: "Open Cart - Docker",
        release: "9.87.6",
        testEnvironment: "DOCKER",
        embedAssets: true,
        embedAttachments: true,
        outputFolder: "playwright-html-report-docker",
        minifyAssets: true,
        startServer: false,
      },
    ],
  ],

  use: {
    trace: "retain-on-failure", // Only record timelines if things break to save space
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://naveenautomationlabs.com/opencart/index.php",

    // 🗑️ CLEANUP: Removed httpCredentials since Opencart handles logins via standard web forms

    connectOptions: {
      wsEndpoint: process.env.PLAYWRIGHT_SERVER_URL || "ws://localhost:3000",
    },
  },

  /* 🔒 Note: If your custom fixtures are reading 'metadata.appUserName',
    keep this block here, but we recommend migrating these variables to your .env file!
  */
  metadata: {
    appUserName: "raghu@gmail.com",
    appPassWord: "Light@1234",
  },

  projects: [
    {
      name: "chromium-docker",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox-docker",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit-docker",
      use: {
        ...devices["Desktop Safari"],
        ignoreHTTPSErrors: true,

        viewport: { width: 1280, height: 720 },
      },
    },
  ],
});
