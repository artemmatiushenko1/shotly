import z from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

export const serverEnv = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().nonempty(),
    GOOGLE_AUTH_CLIENT_ID: z.string().nonempty(),
    GOOGLE_AUTH_CLIENT_SECRET: z.string().nonempty(),
    DATABASE_URL: z.url(),
    IMAGE_STORAGE_BASE_URL: z.url(),
    S3_REGION: z.string().nonempty(),
    S3_ENDPOINT: z.string().nonempty(),
    S3_ACCESS_KEY: z.string().nonempty(),
    S3_SECRET_KEY: z.string().nonempty(),
    S3_PUBLIC_URL: z.url(),
  },
  experimental__runtimeEnv: process.env,
});
