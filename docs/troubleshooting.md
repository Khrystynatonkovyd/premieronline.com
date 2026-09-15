# Troubleshooting

## Installation

Use Node.js 24 LTS and npm 12. Remove neither the lockfile nor version constraints to work
around dependency errors. Run `npm ci` in CI and after cloning a repository with a lockfile.

## Browser availability

If Chromium is missing, run `npx playwright install chromium`. On Linux CI, use
`npx playwright install --with-deps chromium`.

## Environment validation

Compare `.env` with `.env.example`. `ENABLE_VISITOR_TESTS=true` requires a valid email and non-empty
password. Keep `API_BASE_URL` empty until the API is approved.

## Authentication

Confirm the dedicated Visitor account works manually and is not locked. Delete the ignored
`playwright/.auth/visitor.json` and rerun `npm run test:visitor` after credential rotation. Do not
attach the state file to issues.

## Timeouts and live search

Inspect the trace before increasing timeouts. Production availability and live-search latency can
vary, but hard-coded waits conceal the cause. Prefer assertions against the visible search table or
empty-result message.

## Local and CI differences

Check Node versions, environment variables, outbound network policy, time zone assumptions, and
browser installation. CI intentionally runs only Guest smoke until authenticated execution is
approved.

## Debug evidence

Use `npm run test:debug` locally. Failure screenshots, video, and trace files are under
`test-results/`; Playwright HTML is under `playwright-report/`; Allure inputs are under
`allure-results/`. These paths are generated and must not be committed.
