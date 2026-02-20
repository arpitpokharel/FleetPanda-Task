const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users } = require('../utils/testData');

test.describe('Authentication', () => {
  test('TC-001 login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(users.standard.username, users.standard.password);

    await inventory.assertLoaded();
  });

  test('TC-002 login with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.invalid.username, users.invalid.password);

    await login.assertErrorContains('Username and password do not match');
    await login.assertOnLoginPage();
  });

  test('TC-003 login with locked out user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(users.lockedOut.username, users.lockedOut.password);

    await login.assertErrorContains('Sorry, this user has been locked out');
    await login.assertOnLoginPage();
  });
});
