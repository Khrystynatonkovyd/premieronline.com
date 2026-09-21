# Framework Architecture

The framework uses a shallow layered design. Test specifications express observable behavior and
assertions. Typed fixtures construct page objects. Page and component objects own interaction and
locator details. Configuration validates the environment before Playwright starts.

## Dependency direction

```text
tests -> fixtures -> pages/components -> UI actions -> Playwright
tests -> API clients -> Playwright request context
config <- Playwright configuration and authentication setup
```

Lower layers never import test specifications. `HeaderComponent` is shared by pages so header
locators have a single owner. Page objects expose actions and elements; assertions remain visible in
tests.

## Fixtures

`src/fixtures/test.fixture.ts` extends Playwright with typed `homePage` and `loginPage` fixtures.
Each test receives fresh objects bound to its isolated browser page, allowing parallel execution.

## UI objects

`HomePage` owns page-level behavior. `HeaderComponent` owns navigation and live-search behavior.
`LoginPage` owns the sign-in form. Accessible roles, labels, and placeholders are the default
locator strategy. The search result table uses `#s_ext_events` because the live application exposes
no suitable accessible name or test ID for that stable result container.

Reusable browser interactions live in `UiActions`. Page and component objects call these methods
instead of invoking common Playwright actions directly. Every action logs its start and outcome,
adds a descriptive context if it fails, and preserves the original error as its cause. Entered
values are deliberately excluded from logs so credentials and other sensitive data remain private.

## API clients

`BaseApiClient` centralizes typed Playwright request operations. A future domain client should
extend it only after the team supplies an approved base URL and contract. No speculative endpoint
is present.

## Test data and builders

Immutable, non-sensitive search values live in `src/test-data`. A builder is deliberately omitted:
the current scenarios do not construct complex objects, and adding one would be unnecessary
abstraction.

## Authentication

When `ENABLE_VISITOR_TESTS=true` and both credential variables exist, authenticated tests use a
fixture chain that opens the home page, follows the header's `Sign in` link, signs in with the
dedicated Visitor account, and verifies the authenticated navigation contract. Each Visitor test
gets a fresh isolated browser context and authenticates through this fixture chain.

## Execution flow

Playwright loads and validates the environment, runs global setup, creates an isolated context,
injects typed fixtures, runs a test through page objects, records failure artifacts, and invokes
global teardown. Production tests do not create data, so teardown currently has no destructive work.
