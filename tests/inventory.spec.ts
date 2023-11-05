import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkotPage';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.describe("Inventory page tests", () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.loginStandardUser();
    await inventoryPage.goto({})
  });

  test.afterEach(async ({ }) => {
    await inventoryPage.close();
  });

  test('Check add to cart scenario and go back', async ({ }) => {
    const itemsInTheCart = await inventoryPage.clickAddToCartButton();
    await inventoryPage.gotoCart();
    await cartPage.checkItemsCount(itemsInTheCart);
    await cartPage.clickContinueButton();
    await inventoryPage.goto({ onlyUrlCheck: true });
  });

  test('Check add to cart scenario and checkout', async ({ }) => {
    const itemsInTheCart = await inventoryPage.clickAddToCartButton();
    await inventoryPage.gotoCart();
    await cartPage.checkItemsCount(itemsInTheCart);
    await cartPage.clickCheckoutButton();
    await checkoutPage.goto({ onlyUrlCheck: true });
    await checkoutPage.fillFieldsRandomly();
    await checkoutPage.goto({ onlyUrlCheck: true });
    await cartPage.checkItemsCount(itemsInTheCart);
    await checkoutPage.clickFinishButton();
    await checkoutPage.goto({ onlyUrlCheck: true });
    await checkoutPage.clickBackHomeButton();
    await inventoryPage.goto({ onlyUrlCheck: true });
  });

});