const { expect } = require('@playwright/test');

async function expectCartBadgeCount(page, expectedCount) {
  const badge = page.locator('[data-test="shopping-cart-badge"]');
  if (expectedCount === 0) {
    await expect(badge).toHaveCount(0);
    return;
  }
  await expect(badge).toHaveText(String(expectedCount));
}

module.exports = { expectCartBadgeCount };
