import { createAuthClient } from 'better-auth/react';

import { clientEnv } from '@/env/client';

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
});
