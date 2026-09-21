import { test, expect } from '../../src/fixtures/test.fixture.js';
import { env } from '../../src/config/env.js';
import { visitorData } from '../../src/test-data/visitor-data.js';

test.skip(!env.visitorEnabled, 'Add Visitor credentials to .env and enable Visitor tests.');
test.setTimeout(60_000);

test(visitorData.personalRegistrations.testTitle, async ({ page, personalRegistrationsPage }) => {
  await personalRegistrationsPage.open();

  await expect(page).toHaveURL(visitorData.personalRegistrations.path);
  await expect(personalRegistrationsPage.breadcrumb).toBeVisible();
  await expect(personalRegistrationsPage.breadcrumbAccountLink).toBeVisible();
  await expect(personalRegistrationsPage.breadcrumbCurrent).toBeVisible();
  await expect(personalRegistrationsPage.registrationsSection).toBeVisible();
  await expect(personalRegistrationsPage.registrationsTable).toBeVisible();
  await expect(personalRegistrationsPage.tableHeaders).toHaveText(
    visitorData.personalRegistrations.tableHeaders,
  );
  await expect(personalRegistrationsPage.emptyTitle).toBeVisible();
  await expect(personalRegistrationsPage.emptyDescription).toBeVisible();
});

test(visitorData.friends.testTitle, async ({ page, friendsPage }) => {
  await friendsPage.open();

  await expect(page).toHaveURL(visitorData.friends.path);
  await expect(friendsPage.breadcrumb).toBeVisible();

  for (const breadcrumbItem of visitorData.friends.breadcrumb) {
    await expect(friendsPage.breadcrumbItem(breadcrumbItem)).toBeVisible();
  }

  for (const friendTab of visitorData.friends.tabs) {
    await friendsPage.openTab(friendTab);

    await expect(page).toHaveURL(friendTab.path);
    await expect(friendsPage.emptyDescription).toBeVisible();
    await expect(friendsPage.emptyMessage).toHaveText(friendTab.emptyMessage);
  }
});
