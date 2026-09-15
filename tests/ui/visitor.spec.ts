import { test, expect } from '../../src/fixtures/test.fixture.js';
import { env } from '../../src/config/env.js';

test.skip(!env.visitorEnabled, 'Add Visitor credentials to .env and enable Visitor tests.');

test('@regression @ui @visitor Visitor can open the home page with an authenticated session', async ({
  homePage,
}) => {
  await homePage.open();
  await expect(homePage.upcomingEventsHeading).toBeVisible();
  await expect(homePage.header.signInLink).toHaveCount(0);
});
