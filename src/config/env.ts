import 'dotenv/config';
import { z } from 'zod';

const optionalUrl = z.preprocess(
  (value) => (value === '' ? undefined : value),
  z.string().url().optional(),
);

const schema = z
  .object({
    TEST_ENV: z.enum(['production']).default('production'),
    BASE_URL: z.string().url().default('https://www.premieronline.com'),
    API_BASE_URL: optionalUrl,
    TEST_USER_EMAIL: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z.string().email().optional(),
    ),
    TEST_USER_PASSWORD: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z.string().min(1).optional(),
    ),
    ENABLE_VISITOR_TESTS: z
      .enum(['true', 'false'])
      .default('false')
      .transform((value) => value === 'true'),
  })
  .superRefine((value, context) => {
    if (value.ENABLE_VISITOR_TESTS && (!value.TEST_USER_EMAIL || !value.TEST_USER_PASSWORD)) {
      context.addIssue({
        code: 'custom',
        message:
          'ENABLE_VISITOR_TESTS=true requires TEST_USER_EMAIL and TEST_USER_PASSWORD in the local environment.',
      });
    }
  });

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues.map((issue) => issue.message).join(' ');
  throw new Error(`Invalid test environment: ${details}`);
}

export const env = {
  ...parsed.data,
  visitorEnabled:
    parsed.data.ENABLE_VISITOR_TESTS &&
    Boolean(parsed.data.TEST_USER_EMAIL) &&
    Boolean(parsed.data.TEST_USER_PASSWORD),
};

export type TestEnvironment = typeof env;
