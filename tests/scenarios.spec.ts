import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkotPage';
import { allure } from 'allure-playwright';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.describe("Scenarios", () => {

  test.beforeEach(async ({ page }, testInfo) => {
    allure.epic("Scenarios");
    allure.story("Scenarios");
    allure.feature(testInfo.title);
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login("standard");
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
    await inventoryPage.goto({ onlyCheck: true });
  });

  test('Check add to cart scenario and checkout', async ({ }) => {
    const itemsInTheCart = await inventoryPage.clickAddToCartButton();
    await inventoryPage.gotoCart();
    await cartPage.checkItemsCount(itemsInTheCart);
    await cartPage.clickCheckoutButton();
    await checkoutPage.goto({ onlyCheck: true });
    await checkoutPage.fillFieldsRandomly();
    await checkoutPage.goto({ onlyCheck: true });
    await cartPage.checkItemsCount(itemsInTheCart);
    await checkoutPage.clickFinishButton();
    await checkoutPage.goto({ onlyCheck: true });
    await checkoutPage.clickBackHomeButton();
    await inventoryPage.goto({ onlyCheck: true });
  });

  test('Check hamburger button', async ({ }) => {    
    await inventoryPage.clickBurgerButton();
    await inventoryPage.checkSidebar();
  });

  test('Check AZ sorting', async ({ }) => {    
    await inventoryPage.selectSortOption("az");
    await inventoryPage.checkSorting("az");
  });

  test('Check ZA sorting', async ({ }) => {    
    await inventoryPage.selectSortOption("za");
    await inventoryPage.checkSorting("za");
  });

  test('Check LOHI sorting', async ({ }) => {    
    await inventoryPage.selectSortOption("lohi");
    await inventoryPage.checkSorting("lohi");
  });

  test('Check HILO sorting', async ({ }) => {    
    await inventoryPage.selectSortOption("hilo");
    await inventoryPage.checkSorting("hilo");
  });

});