# Test Strategy

## Objective and model

Automate a small, dependable set of high-value production checks while keeping the design ready for
future API coverage. The preferred model is API-heavy once an approved contract exists, with a
focused UI layer for navigation, search, rendering, and authentication integration.

## Scope

In scope: Guest navigation metadata, visible primary content, live search, and dedicated Visitor
login/session reuse. Future scope: API contract and workflow checks.

Out of scope: registration, purchases, event enrollment, profile updates, account creation, contact
forms, or any action that changes production data. Cross-browser and mobile coverage are deferred.

## Prioritization and tags

- `@smoke`: fast evidence that the public home page and navigation contract are available.
- `@regression`: deeper search and authenticated scenarios.
- `@ui`: browser-based tests.
- `@api`: API tests after approval.
- `@visitor`: requires the dedicated test account.

Chrome desktop is the initial supported browser. Add another browser only from risk evidence, not by
duplicating the whole suite automatically.

## Stability policy

Tests use auto-waiting and visible application outcomes. CI permits one retry only to collect
evidence from transient infrastructure failures; a test that passes only on retry is still treated
as flaky. Quarantine requires an owner, linked issue, reason, and expiry date. Quarantined tests are
excluded from merge gates but run in a separate scheduled job when that job is introduced.

## Quality gates and metrics

Required gates are formatting, linting, type checking, documentation consistency, and Guest smoke.
Track first-run pass rate, flaky rate, duration, escaped defects, and mean time to repair. Initial
targets are at least 99% first-run pass rate, under 1% flaky executions, and a smoke duration under
five minutes on CI.
