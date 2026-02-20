const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  addToCartButtonFor(itemName) {
    return this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: itemName }),
    }).locator('button:has-text("Add to cart")');
  }

  removeButtonFor(itemName) {
    return this.page.locator('.inventory_item').filter({
      has: this.page.locator('.inventory_item_name', { hasText: itemName }),
    }).locator('button:has-text("Remove")');
  }

  async assertLoaded() {
    await expect(this.page).toHaveURL(/inventory/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async assertInventoryCardsHaveCoreFields() {
    const count = await this.inventoryItems.count();
    await expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      const card = this.inventoryItems.nth(i);
      await expect(card.locator('.inventory_item_name')).toBeVisible();
      await expect(card.locator('.inventory_item_price')).toBeVisible();
      await expect(card.locator('img')).toBeVisible();
      await expect(card.locator('button')).toBeVisible();
    }
  }

  async addItemToCart(itemName) {
    await this.addToCartButtonFor(itemName).click();
  }

  async removeItemFromCart(itemName) {
    await this.removeButtonFor(itemName).click();
  }

  async sortByLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async getVisiblePrices() {
    const rawPrices = await this.page.locator('.inventory_item_price').allTextContents();
    return rawPrices.map((p) => Number(p.replace('$', '')));
  }

  async logout() {
    await this.menuButton.click();
    await expect(this.logoutLink).toBeVisible();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
