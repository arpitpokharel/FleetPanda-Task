// Central Playwright configuration for stable local and CI runs.
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

function resolveHeadlessShellPath() {
  const home = process.env.HOME || '';
  const candidates = [
    'chromium_headless_shell-1208/chrome-headless-shell-mac-arm64/chrome-headless-shell',
    'chromium_headless_shell-1208/chrome-headless-shell-mac-x64/chrome-headless-shell',
    'chromium_headless_shell-1200/chrome-headless-shell-mac-arm64/chrome-headless-shell',
    'chromium_headless_shell-1200/chrome-headless-shell-mac-x64/chrome-headless-shell',
  ].map((p) => path.join(home, 'Library/Caches/ms-playwright', p));

  return candidates.find((candidate) => fs.existsSync(candidate));
}

const headlessShellPath = resolveHeadlessShellPath();

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Use discovered browser path when available; otherwise use Playwright default.
    launchOptions: headlessShellPath ? { executablePath: headlessShellPath } : {},
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
