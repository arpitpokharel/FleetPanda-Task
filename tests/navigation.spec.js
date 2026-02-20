const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users } = require('../utils/testData');

test('TC-010 logout from side menu', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login(users.standard.username, users.standard.password);

  await inventory.logout();
  await login.assertOnLoginPage();
});
