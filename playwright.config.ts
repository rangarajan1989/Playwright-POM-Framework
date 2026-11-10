import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const baseURL = process.env.BASE_URL;

if (!baseURL) {
  throw new Error(
    "BASE_URL is missing. Check your .env file or GitHub Secrets.",
  );
}

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html"],
    ["json", { outputFile: "playwright-report/results.json" }],
    ["allure-playwright"],
  ],

  use: {
    baseURL,
    trace: "on-first-retry",
    headless: !!process.env.CI,
    video: "on",
  },

  projects: [
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
});
