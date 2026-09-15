# Continuous Integration

`.github/workflows/quality.yml` is ready before repository creation. It activates when the folder is
pushed to GitHub and runs on pull requests, pushes to `main`, and manual dispatch.

## Jobs

`static-checks` installs locked dependencies and runs formatting, linting, type checking, and
documentation consistency. `guest-smoke` depends on it, installs Chromium, and runs the production-
safe Guest smoke suite. Jobs have bounded timeouts and read-only repository permissions.

The initial suite is too small to benefit from sharding. Introduce Playwright sharding when runtime
or test volume provides evidence for it; keep each shard independent.

## Secrets

The default workflow needs no secrets. If the team later approves Visitor CI, create encrypted
repository secrets named `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`, map them to job environment
variables, and set `ENABLE_VISITOR_TESTS=true`. Protect the environment and restrict who can trigger
it. Never echo secret values.

## Reports, reruns, and merge rules

Playwright, Allure, and test-result artifacts upload for seven days even after failure. CI allows one
retry for evidence but does not treat retry success as proof of stability. Configure branch
protection after repository creation so `static-checks` and `guest-smoke` block merge. A rerun should
be used only after identifying an external transient cause; otherwise fix or quarantine the test.
