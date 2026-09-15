import { test, expect } from '../../src/fixtures/test.fixture.js';
import { searchData } from '../../src/test-data/search-data.js';

test.describe('Premiere Online home page', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('@smoke @regression @ui Guest sees the primary navigation', async ({ homePage }) => {
    await expect(homePage.upcomingEventsHeading).toBeVisible();
    await expect(homePage.header.logo).toHaveAttribute('href', /premieronline\.com\/?$/);
    await expect(homePage.header.eventsLink).toHaveAttribute('href', /\/calendar$/);
    await expect(homePage.header.ratingsLink).toHaveAttribute('href', /\/event_ratings\.php$/);
    await expect(homePage.header.signInLink).toHaveAttribute('href', /\/action\/dologin$/);
  });

  test('@regression @ui Guest finds events using the header search', async ({ homePage }) => {
    await homePage.header.search(searchData.existing);

    await expect(homePage.header.searchResults()).toBeVisible();
    await expect(homePage.header.searchResults().locator('tr').nth(1)).toBeVisible();
  });

  test('@regression @ui Guest receives feedback for an unknown event', async ({ homePage }) => {
    await homePage.header.search(searchData.missing);

    await expect(homePage.header.noResultsMessage()).toBeVisible();
  });
});
