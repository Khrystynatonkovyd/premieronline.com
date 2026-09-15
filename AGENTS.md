# AI Agent Rules

## Scope and safety

- Treat Premiere Online as production. Run only read-only UI actions: navigation, display checks,
  search, and login with the dedicated Visitor account.
- Do not create accounts, register for events, submit personal data, or change production records.
- Never read, print, copy, expose, or commit `.env`, authentication state, cookies, passwords, or
  tokens. Refer to users by `Guest` or `Visitor` in test titles and abstractions.
- Preserve unrelated and unfinished changes. Do not overwrite or reformat files outside the task.

## Allowed commands

- `npm install` or `npm ci`
- `npx playwright install chromium`
- npm scripts declared in `package.json`
- Read-only Git commands such as `git status` and `git diff`

Do not execute destructive commands, publish packages, push branches, or create external data
without explicit user authorization.

## Architecture

- Tests depend on fixtures and page/API objects; infrastructure must not depend on test files.
- Keep assertions in tests unless an assertion is an intentional reusable domain contract.
- Store shared header locators only in `HeaderComponent`; do not duplicate them in pages or tests.
- Prefer role, label, placeholder, and `data-testid` locators. Use CSS only for a stable application
  contract that has no accessible equivalent, and explain it in code.
- Use Playwright auto-waiting and web-first assertions. Never add hard-coded waits.
- Keep tests independent, parallel-safe, and free of mutable shared data.
- API tests require an approved contract and safe endpoint before becoming executable.

## Conventions

- Use strict TypeScript, ESM imports with `.js` extensions, and explicit public types where useful.
- Test titles must include relevant tags: `@smoke`, `@regression`, `@ui`, `@api`, or `@visitor`.
- Put reusable data in `src/test-data`; add a builder only when objects have meaningful optional
  combinations or invariants.
- Cleanup data in fixtures or `finally` blocks. Production scenarios should not create data.

## Never commit

Do not commit `.env`, `playwright/.auth`, `test-results`, `playwright-report`, `allure-results`,
`allure-report`, screenshots, traces, videos, logs, or temporary files.

## Required checks

After a change, run the narrowest relevant test and then `npm run validate`. Before a pull request,
run `npm run prepr`. Review `git status` and confirm that no secret or generated artifact is tracked.

## Definition of done and final report

A task is complete when code and documentation agree, static checks pass, relevant runnable tests
pass, production safety is preserved, and limitations are explicit. The final report must include a
summary, changed files, architecture decisions, checks and results, unverified behavior, known
limitations, next steps, and any access still required.
