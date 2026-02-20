const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async open() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/cart/);
  }

  async assertItemInCart(itemName) {
    await expect(this.page.locator('.inventory_item_name', { hasText: itemName })).toBeVisible();
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
