# Playwright-POM-Framework# Playwright POM Automation Framework

A scalable, maintainable, and robust end-to-end (E2E) UI & API test automation framework built using **Playwright** and **TypeScript** leveraging the **Page Object Model (POM)** design pattern.

This framework is highly optimized for CI/CD environments, utilizing custom fixtures, environment-specific configurations, parallel execution, and automated reporting.

---

## 🚀 Key Features

- **Page Object Model (POM):** Decoupled architecture separating page element locators and page-specific actions from actual test validation scripts.
- **Custom Test Fixtures:** Native dependency injection extending base Playwright tests to handle automatic setup configurations (e.g., custom authorization/login injections) and post-test teardown/cleanup actions.
- **Multi-Environment Ready:** Dynamic configuration support allowing tests to execute seamlessly against distinct target environments (e.g., `QA` vs `PROD`) utilizing dedicated config variants.
- **API Testing & JSON Schema Validation:** Built-in API capabilities combined with AJV schema compliance checks to guard against structural payload breaking changes.
- **Fully Parallel Execution:** Drastically reduced test suite runtimes optimized through complete independent process parallelism settings.
- **CI/CD Integrated:** Production-ready pipeline pipelines pre-configured for **GitHub Actions** workflows with flexible scheduling options (Cron) and artifact-backed HTML test reports.

---

## 📦 Project Directory Structure

```text
├── .github/workflows/      # CI/CD pipelines (GitHub Actions YAML)
├── fixtures/               # Extended custom Playwright fixture files
├── page-objects/           # Component & POM classes (locators + actions)
├── schemas/                # JSON schema files for API validation tests
├── test-data/              # Test configuration sets (e.g., qa.json, prod.json)
├── tests/                  # Test specification files (*.spec.ts)
├── playwright.config.qa.ts # QA Environment execution configurations
├── playwright.config.ts    # Default framework configuration settings
└── tsconfig.json           # Global TypeScript settings
```

## ⚙️ Setup & Configuration

1. Install Node.js (recommended 18.x or newer) and npm.
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers and tool dependencies:
   ```bash
   npx playwright install
   ```
4. Review and update `playwright.config.ts` for your environment:
   - `baseURL` sets the application under test.
   - `metadata.appUserName` and `metadata.appPassWord` hold the login credentials used by tests.
   - `reporter` config writes HTML and JSON results to `playwright-report/`.
   - `projects` currently uses the Chrome channel, so Chrome should be available on the host.
5. Run the full test suite:
   ```bash
   npx playwright test
   ```
6. Run an individual spec:
   ```bash
   npx playwright test tests/login.spec.ts
   ```
7. Open the generated HTML report:
   ```bash
   npx playwright show-report
   ```

### Notes

- The framework uses TypeScript via Playwright’s built-in support, so no separate transpilation step is required.
- If you need a different browser or environment, edit `playwright.config.ts` and adjust the `projects` or `use` settings.
- For CI execution, ensure `CI=true` is set so retries, headless mode, and worker behavior are applied correctly.

---

## 📊 Test Reports & Dashboard

After every test run, the following reports are automatically generated and published to GitHub Pages:

| Report                   | URL                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 🏠 **Main Dashboard**    | [https://rangarajan1989.github.io/Playwright-POM-Framework/](https://rangarajan1989.github.io/Playwright-POM-Framework/)                       |
| 📋 **Playwright Report** | [https://rangarajan1989.github.io/Playwright-POM-Framework/playwright/](https://rangarajan1989.github.io/Playwright-POM-Framework/playwright/) |
| 📊 **Allure Report**     | [https://rangarajan1989.github.io/Playwright-POM-Framework/allure/](https://rangarajan1989.github.io/Playwright-POM-Framework/allure/)         |

**Note:** Reports are automatically updated after each GitHub Actions workflow run. It may take a few minutes for changes to be published.

---

## ☁️ BrowserStack Execution

This framework supports execution on BrowserStack using the BrowserStack Node SDK.

### Prerequisites

1. Create a `.env` file in the project root.
2. Add your BrowserStack credentials:

```env
BROWSERSTACK_USERNAME=<your_browserstack_username>
BROWSERSTACK_ACCESS_KEY=<your_browserstack_access_key>
```

Alternatively, export these environment variables in your shell or CI/CD pipeline.

### Run Tests on BrowserStack

Execute the following command:

```bash
node --env-file=.env node_modules/browserstack-node-sdk/src/bin/runner.js playwright test --config=playwright.config.ts
```

This command performs the following:

- Loads environment variables from the `.env` file.
- Starts the BrowserStack Node SDK.
- Executes the Playwright test suite using the specified Playwright configuration.
- Uploads test results to your BrowserStack dashboard.

### Run a Specific Test

```bash
node --env-file=.env node_modules/browserstack-node-sdk/src/bin/runner.js playwright test tests/login.spec.ts --config=playwright.config.ts
```

### BrowserStack Dashboard

After execution, test results can be viewed in your BrowserStack Automate dashboard.
