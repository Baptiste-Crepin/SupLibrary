import { expect, test } from '@playwright/test';

test('search_for_a_book', async ({ page }) => {
  await page.goto('http://localhost:5173/SupLibrary/Search');

  await page.getByPlaceholder('Search for books, authors, genres...').fill('Les misérables');
  // await page.waitForResponse(response =>
  //   response.url().includes('search') && response.status() === 200
  // );;
  await page.waitForLoadState('networkidle');

  const searchList = page.locator('div[class*=search-results]');
  await searchList.waitFor({ state: 'visible' });

  await expect(searchList).toContainText('Les Misérables', { timeout: 10000 });

  const lesMiserablesBook = page.locator('div[class*=search-result-item]')
    .filter({ hasText: /Les Misérables/i });

  await lesMiserablesBook.waitFor({ state: 'visible' });
  await lesMiserablesBook.click();

  await expect(page).toHaveURL('http://localhost:5173/SupLibrary/works/OL1063588W');
});

test('search_for_a_book_by_author', async ({ page }) => {
  await page.goto('http://localhost:5173/SupLibrary/Search');

  await page.getByPlaceholder('Author').fill('Victor Hugo');
  // await page.waitForResponse(response =>
  //   response.url().includes('search') && response.status() === 200
  // );
  await page.waitForLoadState('networkidle');


  const searchList = page.locator('div[class*=search-results]');
  await searchList.waitFor({ state: 'visible' });

  await expect(searchList).toContainText('Victor Hugo', { timeout: 10000 });

  const items = searchList.locator('div[class*=search-result-item]');

  await items.first().waitFor({ state: 'visible' });

  const lesMiserablesBook = items.filter({ hasText: /Les Misérables/i });
  await lesMiserablesBook.waitFor({ state: 'visible' });
  await lesMiserablesBook.click();

  await expect(page).toHaveURL('http://localhost:5173/SupLibrary/works/OL1063588W');
});