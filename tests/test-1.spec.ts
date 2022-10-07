import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to https://www.google.com/
  await page.goto('https://www.google.com/');

  // Click button:has-text("Zaakceptuj wszystko")
  await page.locator('button:has-text("Zaakceptuj wszystko")').click();
  await expect(page).toHaveURL('https://www.google.com/');

  // Click [aria-label="Szukaj"]
  await page.locator('[aria-label="Szukaj"]').click();

  // Fill [aria-label="Szukaj"]
  await page.locator('[aria-label="Szukaj"]').fill('test');

  // Click div:has-text("Korzystaj z Google w tych językach: English") >> nth=1
  await page.locator('div:has-text("Korzystaj z Google w tych językach: English")').nth(1).click();

  // Click text=Szczęśliwy traf >> nth=1
  await page.locator('text=Szczęśliwy traf').nth(1).click();
  await expect(page).toHaveURL('https://www.speedtest.pl/');

  // Click [aria-label="OK\, przejdź do strony"]
  // await page.locator('[aria-label="OK\\, przejdź do strony"]').click();

});