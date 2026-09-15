import { test as setup, expect } from '../src/fixtures/test.fixture.js';
import { env } from '../src/config/env.js';
import { userRoles } from '../src/models/user-role.js';

const authFile = 'playwright/.auth/visitor.json';

setup.skip(!env.visitorEnabled, 'Add Visitor credentials to .env and enable Visitor tests.');

setup(`authenticate ${userRoles.visitor}`, async ({ page, loginPage }) => {
  if (!env.TEST_USER_EMAIL || !env.TEST_USER_PASSWORD) {
    throw new Error('Visitor credentials are required when Visitor tests are enabled.');
  }

  await loginPage.open();
  await loginPage.signIn(env.TEST_USER_EMAIL, env.TEST_USER_PASSWORD);
  await expect(page).not.toHaveURL(/\/action\/dologin/);
  await page.context().storageState({ path: authFile });
});
