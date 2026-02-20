# Fleet Panda Assessment - QA Automation (SauceDemo)

This project contains:
- Test plan and QA documents (`.doc`)
- Test cases in Excel (`F_Test_Cases.xlsx`)
- Playwright automation for the developed test cases

## 1. Prerequisites

Install these first:
- Node.js (v18+ recommended)
- npm (comes with Node.js)

Check versions:

```bash
node -v
npm -v
```

## 2. Clone and Open Project

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Install Playwright Browsers

```bash
npx playwright install
```

## 5. Run Automated Tests

```bash
npm test
```

## 6. Optional Commands

Run tests in headed mode:

```bash
npm run test:headed
```

Open Playwright HTML report:

```bash
npm run test:report
```

## 7. Project Structure

```text
pages/      # Page Object Model classes
tests/      # Feature-based test specs
utils/      # Reusable test data and assertion helpers
playwright.config.js
package.json
```

## 8. Mapped Automated Test Cases

Automated test coverage includes:
- TC-001 to TC-003: Authentication
- TC-004 to TC-006, TC-009: Inventory/Cart
- TC-007 to TC-008: Checkout
- TC-010: Logout/Navigation

## 9. Notes

- Base URL is configured in `playwright.config.js` as `https://www.saucedemo.com`.
- On failures, Playwright keeps screenshots/traces/videos (as configured).
