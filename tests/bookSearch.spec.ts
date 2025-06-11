import { expect, test } from '@playwright/test';

test('search_for_a_book', async ({ page }) => {
  await page.goto('http://localhost:5173/SupLibrary');
  await page.getByPlaceholder('Search for books, authors, genres...').fill('Les misérables');

  const searchList = page.locator('ul[class*=search-results]');
  await searchList.waitFor({ state: 'visible' });
  const items = searchList.locator('li');

  const selectedBook = items.first();
  await selectedBook.click();

  await expect(page).toHaveURL('http://localhost:5173/SupLibrary/works/OL1063588W');
});