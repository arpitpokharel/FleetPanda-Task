const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users, checkoutData } = require('../utils/testData');

const productName = 'Sauce Labs Backpack';

async function loginAndAddItem(page) {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login(users.standard.username, users.standard.password);
  await inventory.addItemToCart(productName);
}

test.describe('Checkout', () => {
  test('TC-007 complete checkout with valid details', async ({ page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await loginAndAddItem(page);
    await cart.open();
    await cart.assertItemInCart(productName);
    await cart.startCheckout();

    await checkout.fillInformation(checkoutData.valid);
    await checkout.continue();
    await checkout.finish();

    await checkout.assertOrderComplete();
  });

  test('TC-008 checkout validation with missing required fields', async ({ page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await loginAndAddItem(page);
    await cart.open();
    await cart.startCheckout();

    await checkout.fillInformation(checkoutData.missingFirstName);
    await checkout.continue();

    await checkout.assertValidationError();
  });
});
