import { defineConfig, devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import { env } from './src/config/env.js';

const browserUse = {
  ...devices['Desktop Chrome'],
  baseURL: env.BASE_URL,
  screenshot: 'only-on-failure' as const,
  trace: 'retain-on-failure' as const,
  video: 'retain-on-failure' as const,
};

const projects: NonNullable<PlaywrightTestConfig['projects']> = [
  {
    name: 'guest-chromium',
    testMatch: /ui\/.*\.spec\.ts/,
    grepInvert: /@visitor/,
    use: browserUse,
  },
  {
    name: 'api',
    testMatch: /api\/.*\.spec\.ts/,
    use: { baseURL: env.API_BASE_URL ?? env.BASE_URL },
  },
  {
    name: 'visitor-setup',
    testMatch: /auth\.setup\.ts/,
    use: browserUse,
  },
  {
    name: 'visitor-chromium',
    testMatch: /ui\/.*\.spec\.ts/,
    grep: /@visitor/,
    dependencies: ['visitor-setup'],
    use: { ...browserUse, storageState: 'playwright/.auth/visitor.json' },
  },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  ...(process.env.CI ? { workers: 2 } : {}),
  timeout: 30_000,
  expect: { timeout: 7_500 },
  outputDir: 'test-results',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  globalSetup: './src/setup/global-setup.ts',
  globalTeardown: './src/setup/global-teardown.ts',
  projects,
});
