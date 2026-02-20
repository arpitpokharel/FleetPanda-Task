const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users } = require('../utils/testData');
const { expectCartBadgeCount } = require('../utils/assertions');

const productName = 'Sauce Labs Backpack';

test.describe('Inventory and cart interactions', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(users.standard.username, users.standard.password);
  });

  test('TC-004 verify inventory core fields are visible', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.assertLoaded();
    await inventory.assertInventoryCardsHaveCoreFields();
  });

  test('TC-005 add one item to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addItemToCart(productName);
    await expectCartBadgeCount(page, 1);
  });

  test('TC-006 remove item from cart', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addItemToCart(productName);
    await expectCartBadgeCount(page, 1);

    await inventory.removeItemFromCart(productName);
    await expectCartBadgeCount(page, 0);
  });

  test('TC-009 verify sort by price low to high', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortByLowToHigh();
    const prices = await inventory.getVisiblePrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });
});
