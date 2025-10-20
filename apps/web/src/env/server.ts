import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const serverEnv = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().nonempty(),
    GOOGLE_AUTH_CLIENT_ID: z.string().nonempty(),
    GOOGLE_AUTH_CLIENT_SECRET: z.string().nonempty(),
    DATABASE_URL: z.url(),
  },
  experimental__runtimeEnv: process.env,
});
