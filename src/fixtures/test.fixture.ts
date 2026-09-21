import { test as base, expect } from '@playwright/test';
import { env } from '../config/env.js';
import { FriendsPage } from '../pages/friends.page.js';
import { HomePage } from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';
import { PersonalRegistrationsPage } from '../pages/personal-registrations.page.js';

type AppFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  site: HomePage;
  loginPageViaHeader: LoginPage;
  authenticatedVisitor: HomePage;
  personalRegistrationsPage: PersonalRegistrationsPage;
  friendsPage: FriendsPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  site: async ({ homePage }, use) => {
    await homePage.open();
    await use(homePage);
  },
  loginPageViaHeader: async ({ page, site, loginPage }, use) => {
    await site.header.openSignIn();
    await expect(page).toHaveURL(/\/action\/dologin\/?$/);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
    await use(loginPage);
  },
  authenticatedVisitor: async ({ page, loginPageViaHeader, site }, use) => {
    if (!env.TEST_USER_EMAIL || !env.TEST_USER_PASSWORD) {
      throw new Error('Visitor credentials are required for the authenticated Visitor fixture.');
    }

    await loginPageViaHeader.signIn(env.TEST_USER_EMAIL, env.TEST_USER_PASSWORD);
    await expect(page).not.toHaveURL(/\/action\/dologin\/?$/, { timeout: 30_000 });
    await page.waitForLoadState('domcontentloaded');

    await expect(site.header.visitorAccountLink).toBeVisible();
    await expect(site.header.visitorAccountLink).toHaveAttribute(
      'href',
      /\/action\/personal_regs$/,
    );
    await expect(site.header.friendsLink).toBeVisible();
    await expect(site.header.friendsLink).toHaveAttribute('href', /\/friends\.php$/);
    await expect(site.header.messagesLink).toBeVisible();
    await expect(site.header.messagesLink).toHaveAttribute('href', /\/messages\.php$/);
    await expect(site.header.subscriptionsLink).toBeVisible();
    await expect(site.header.subscriptionsLink).toHaveAttribute(
      'href',
      /\/action\/communications$/,
    );
    await expect(site.header.signOutLink).toBeVisible();
    await expect(site.header.signOutLink).toHaveAttribute('href', /\/action\/logout$/);

    await use(site);
  },
  personalRegistrationsPage: async ({ page, authenticatedVisitor }, use) => {
    await use(new PersonalRegistrationsPage(page, authenticatedVisitor.header));
  },
  friendsPage: async ({ page, authenticatedVisitor }, use) => {
    await use(new FriendsPage(page, authenticatedVisitor.header));
  },
});

export { expect };
