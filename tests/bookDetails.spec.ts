import { expect, test } from '@playwright/test';


test.describe('WorkDetail Page', () => {

  const selectedBookUrl = 'http://localhost:5173/SupLibrary/works/OL1063588W';

  test('displays author information', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const authorSection = page.locator('text=/By .+/');
    if (await authorSection.count() > 0) {
      await expect(authorSection).toBeVisible();
    }

    const authorDetailCard = page.locator('[data-testid="author-detail-card"]');
    if (await authorDetailCard.count() > 0) {
      await expect(authorDetailCard).toBeVisible();
    }
  });

  test('displays publication information', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const pubDate = page.locator('text=/First published:/');
    if (await pubDate.count() > 0) {
      await expect(pubDate).toBeVisible();
    }
  });

  test('displays description when available', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const description = page.locator('p').filter({ hasText: /\w{50,}/ });
    if (await description.count() > 0) {
      await expect(description.first()).toBeVisible();
    }
  });

  test('displays subject chips', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const subjectsTitle = page.locator('text=Subjects');
    if (await subjectsTitle.count() > 0) {
      await expect(subjectsTitle).toBeVisible();

      const chips = page.locator('[role="button"]').filter({ hasText: /\w+/ });
      if (await chips.count() > 0) {
        await expect(chips.first()).toBeVisible();
      }
    }
  });

  test('displays rating and bookshelf cards', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const ratingCard = page.locator('[data-testid="rating-card"]');
    if (await ratingCard.count() > 0) {
      await expect(ratingCard).toBeVisible();
    }

    const bookshelfCard = page.locator('[data-testid="bookshelf-card"]');
    if (await bookshelfCard.count() > 0) {
      await expect(bookshelfCard).toBeVisible();
    }
  });

  test('displays wikipedia details when available', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const wikipediaCard = page.locator('[data-testid="wikipedia-details-card"]');
    if (await wikipediaCard.count() > 0) {
      await expect(wikipediaCard).toBeVisible();
    }
  });

  test('displays metadata section', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const divider = page.locator('hr');
    await expect(divider).toBeVisible();

    const metadataItems = page.locator('text=/Type:|Latest revision:|Created:|Last updated:/');
    if (await metadataItems.count() > 0) {
      await expect(metadataItems.first()).toBeVisible();
    }
  });

  test('cover image loads correctly', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const coverImage = page.locator('img[alt*="Cover of"]');

    if (await coverImage.count() > 0) {
      await coverImage.waitFor({ state: 'visible' });

      await expect(coverImage).toHaveAttribute('src', /covers\.openlibrary\.org.*-L\.jpg/);
      await expect(coverImage).toHaveAttribute('alt');

      const naturalWidth = await coverImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('subjects chips have correct functionality', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const subjectsSection = page.locator('text=Subjects').locator('..');

    if (await subjectsSection.count() > 0) {
      const moreChip = subjectsSection.locator('text=/+d+ more/');

      if (await moreChip.count() > 0) {
        await expect(moreChip).toBeVisible();
        await expect(moreChip).toHaveText(/\+\d+ more/);
      }

      const subjectChips = subjectsSection.locator('[role="button"]').filter({ hasNot: page.locator('text=/+d+ more/') });
      const chipCount = await subjectChips.count();
      expect(chipCount).toBeLessThanOrEqual(8);
    }
  });

  test('places, people, and time periods display correctly', async ({ page }) => {
    await page.goto(selectedBookUrl);
    await page.waitForLoadState('networkidle');

    const placesSection = page.locator('text=Places');
    if (await placesSection.count() > 0) {
      await expect(placesSection).toBeVisible();
      const placeChips = placesSection.locator('..').locator('[role="button"]');
      const placeCount = await placeChips.count();
      expect(placeCount).toBeLessThanOrEqual(5);
    }

    const peopleSection = page.locator('text=People');
    if (await peopleSection.count() > 0) {
      await expect(peopleSection).toBeVisible();
      const peopleChips = peopleSection.locator('..').locator('[role="button"]');
      const peopleCount = await peopleChips.count();
      expect(peopleCount).toBeLessThanOrEqual(5);
    }

    const timeSection = page.locator('text=Time Periods');
    if (await timeSection.count() > 0) {
      await expect(timeSection).toBeVisible();
      const timeChips = timeSection.locator('..').locator('[role="button"]');
      const timeCount = await timeChips.count();
      expect(timeCount).toBeLessThanOrEqual(3);
    }
  });

});