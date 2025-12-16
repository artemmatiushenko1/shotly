import z from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
    NEXT_PUBLIC_MAX_PROFILE_IMAGE_SIZE_MB: z.coerce.number().default(2),
    NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB: z.coerce.number().default(2),
    NEXT_PUBLIC_MAX_PORTFOLIO_PHOTO_SIZE_MB: z.coerce.number().default(20),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    NEXT_PUBLIC_MAX_PROFILE_IMAGE_SIZE_MB:
      process.env.NEXT_PUBLIC_MAX_PROFILE_IMAGE_SIZE_MB,
    NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB:
      process.env.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB,
    NEXT_PUBLIC_MAX_PORTFOLIO_PHOTO_SIZE_MB:
      process.env.NEXT_PUBLIC_MAX_PORTFOLIO_PHOTO_SIZE_MB,
  },
});
