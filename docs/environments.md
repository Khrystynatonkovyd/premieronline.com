# Environments

## Available environment

Only production is currently known. `TEST_ENV=production` selects it and `BASE_URL` identifies the
web host. Production execution is limited to navigation, content checks, search, and approved login.

## Local configuration

`.env.example` documents the schema. `.env` contains local values and is ignored by Git. All values
are parsed by `src/config/env.ts`; invalid URLs, incomplete Visitor credentials, and unsupported
environment names fail with a clear startup error.

## Secrets and test users

`Guest` requires no credentials. `Visitor` is a dedicated non-personal account with minimum
permissions. Put its email and password only in local `.env` or encrypted GitHub secrets. Never put
them in prompts, source code, reports, screenshots, traces, or logs. Rotate the password if exposure
is suspected.

Visitor execution requires all three settings:

```env
TEST_USER_EMAIL=<dedicated test account email>
TEST_USER_PASSWORD=<dedicated test account password>
ENABLE_VISITOR_TESTS=true
```

## Future API environment

Leave `API_BASE_URL` empty until the team provides an approved host, authentication model, contract,
rate limits, and safe endpoints. The API project is infrastructure only until then.

If access fails, verify DNS/VPN requirements, account status, environment values, and production
permission with the product owner before changing tests.
