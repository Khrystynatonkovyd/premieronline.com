# Contributing

## Branches and commits

Create branches from `main` using `feature/<short-name>`, `fix/<short-name>`, or
`test/<short-name>`. Use Conventional Commits such as `test: cover header search`.

## Pull request flow

1. Make a focused change and preserve unrelated work.
2. Add or update tests and documentation together.
3. Run `npm run prepr`.
4. Inspect `git status` for secrets and generated artifacts.
5. Open a pull request with scope, risk, evidence, and known limitations.

At least one Automation QA reviewer is required. Changes to production scope, credentials,
authentication, CI permissions, or data-writing behavior also require the product owner's approval.
Do not merge with failing required checks.

## Adding tests

- Select the lowest-cost layer and add only meaningful coverage.
- Keep production tests read-only and parallel-safe.
- Reuse fixtures and page/component objects; do not duplicate locators.
- Add the appropriate tags and avoid retries as a flaky-test fix.
- Add API tests only with an approved contract, safe test data, and cleanup strategy.

## Definition of done

The code is formatted, linted, type-safe, documented, and covered by relevant tests. Tests pass
without hard-coded waits, secret files remain ignored, failure evidence is available, and a new
engineer can run and diagnose the change from repository documentation.
