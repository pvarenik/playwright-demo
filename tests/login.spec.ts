import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;

test.describe("Login page tests", () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test.afterEach(async ({ }) => {
    await loginPage.close();
  });

  test('Check login with standard user', async ({ page }) => {
    await loginPage.loginStandardUser();
  });

  test('Check login with locked user', async ({ }) => {
    await loginPage.loginLockedUser();
  });

  test('Check login with problem user', async ({ }) => {
    await loginPage.loginProblemdUser();
  });

  test('Check login with performance user', async ({ }) => {
    await loginPage.loginPerformanceUser();
  });

  test('Check login with error user', async ({ }) => {
    await loginPage.loginErrordUser();
  });

  test('Check login with visual user', async ({ }) => {
    await loginPage.loginVisualUser();
  });

});