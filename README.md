# Premiere Online Test Automation

This repository contains production-safe UI automation for Premiere Online. The executable default
scope covers read-only Guest checks against `https://www.premieronline.com`: page content,
navigation metadata, and search. Visitor authentication is implemented but remains opt-in until a
dedicated test account is configured. The API layer is ready for extension; no production endpoint
is guessed or called without an approved contract.

## Technology

- Node.js 24 LTS and npm 12
- TypeScript with ESM modules
- Playwright Test using Desktop Chrome
- ESLint, Prettier, and TypeScript compiler
- Playwright HTML and Allure reporters
- GitHub Actions

## Prerequisites

Install Node.js 24 LTS and npm 12. Node 24 is used instead of the newer Current release
because production automation should run on a supported LTS line.

## Installation

```bash
npm install --global npm@12.0.2
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env`. A local `.env` with safe defaults is already included in the
generated folder and ignored by Git.

## Environment variables

| Variable               | Required         | Purpose                                                       |
| ---------------------- | ---------------- | ------------------------------------------------------------- |
| `TEST_ENV`             | Yes              | Supported value: `production`                                 |
| `BASE_URL`             | Yes              | Premiere Online web URL                                       |
| `API_BASE_URL`         | Future API tests | Approved API host; leave empty for now                        |
| `TEST_USER_EMAIL`      | Visitor only     | Dedicated Visitor test account email                          |
| `TEST_USER_PASSWORD`   | Visitor only     | Dedicated Visitor test account password                       |
| `ENABLE_VISITOR_TESTS` | Yes              | `false` by default; use `true` only with approved credentials |

Never paste credentials into prompts or commit them. Add them only to `.env` or GitHub encrypted
secrets. To run Visitor tests, fill `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`, then set
`ENABLE_VISITOR_TESTS=true`.

## Commands

```bash
npm test                 # default Guest UI suite
npm run test:all         # every configured project
npm run test:smoke       # Guest smoke suite
npm run test:regression  # Guest regression suite
npm run test:ui          # Guest UI tests
npm run test:api         # API project; passes safely while no API specs exist
npm run test:visitor     # authenticated suite; requires enabled credentials
npm run test:headed      # visible browser
npm run test:debug       # Playwright debugger
npm run lint             # ESLint
npm run format:check     # Prettier verification
npm run type-check       # TypeScript verification
npm run check:docs       # npm script/documentation consistency
npm run validate         # all static quality gates
npm run prepr            # local PR gate plus Guest smoke
npm run report:allure    # generate and open the Allure report
```

Use `npm run format` to apply formatting.

## Structure

```text
.github/workflows/quality.yml  GitHub Actions quality and smoke jobs
docs/                          Architecture, strategy, environments, CI, troubleshooting
scripts/                       Repository consistency checks
src/api/                       Extensible API clients
src/config/                    Typed environment validation
src/fixtures/                  Typed Playwright fixtures
src/models/                    Domain names such as Guest and Visitor
src/pages/                     Page and reusable component objects
src/setup/                     Global setup and teardown
src/test-data/                 Non-sensitive immutable test data
tests/ui/                      Executable UI scenarios
tests/api/                     Future API specifications
```

## Reports and artifacts

Failures retain screenshots, video, and traces under `test-results/`. The HTML report is written to
`playwright-report/`; raw Allure data is written to `allure-results/`. All generated artifacts are
ignored by Git. CI keeps failure artifacts for seven days.

## Troubleshooting

- If configuration fails, compare `.env` with `.env.example`.
- If Chromium is missing, run `npx playwright install chromium`.
- If Visitor tests are unavailable, fill both credentials and set `ENABLE_VISITOR_TESTS=true`.
- If live search fails intermittently, inspect the trace before changing timeouts; tests use the
  popup's visible state and do not use fixed waits.
- For more detail, see `docs/troubleshooting.md`.

## Ownership

The Automation QA team owns this repository. Replace this statement with the team alias when one is
available.
