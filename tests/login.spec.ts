import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { allure } from 'allure-playwright';

let loginPage: LoginPage;

test.describe("Login page tests", () => {

  test.beforeEach(async ({ page }, testInfo) => {
    allure.epic("Login page tests");
    allure.story("Login page tests");
    allure.feature(testInfo.title);
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ }) => {
    await loginPage.close();
  });

  test('Check login with standard user', async ({ page }) => {
    await loginPage.login("standard");
  });

  test('Check login with locked user', async ({ }) => {
    await loginPage.login("locked_out", true);
  });

  test('Check login with problem user', async ({ }) => {
    await loginPage.login("problem");
  });

  test('Check login with performance user', async ({ }) => {
    await loginPage.login("performance_glitch");
  });

  test('Check login with error user', async ({ }) => {
    await loginPage.login("error");
  });

  test('Check login with visual user', async ({ }, testInfo) => {
    await loginPage.login("visual");
  });

});