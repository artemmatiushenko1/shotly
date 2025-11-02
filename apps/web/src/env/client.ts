import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
    NEXT_PUBLIC_NOVA_POST_API_KEY: z.string().min(1),
    NEXT_PUBLIC_NOVA_POST_API_URL: z.url(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    // TODO: move to server envs, so the geocoding executed only on the server
    NEXT_PUBLIC_NOVA_POST_API_KEY: process.env.NEXT_PUBLIC_NOVA_POST_API_KEY,
    NEXT_PUBLIC_NOVA_POST_API_URL: process.env.NEXT_PUBLIC_NOVA_POST_API_URL,
  },
});
