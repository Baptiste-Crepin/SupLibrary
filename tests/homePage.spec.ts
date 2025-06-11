import { expect, test } from '@playwright/test';

test('recentChanges_exists', async ({ page }) => {
  await page.goto('http://localhost:5173/SupLibrary');
  const recentChanges = page.locator('div[class*=recent-changes]');
  await recentChanges.waitFor({ state: 'visible' });
  const items = recentChanges.locator('div[class*=recent-change-item]');

  await expect(items).toHaveCount(32);
});