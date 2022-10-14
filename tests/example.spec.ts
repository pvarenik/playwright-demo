import { test, expect } from '@playwright/test';
import { Pool } from '../pages/pool';

test('Check pool load', async ({ page, browserName }) => {
  
  const pool = new Pool(page);
    
  await pool.goto();
  
  // await pool.screenshot(`main-${browserName}.png`);

  // await pool.cellScreenshot(`highlighted-cell-${browserName}.png`);

  await pool.logPlaces();

});