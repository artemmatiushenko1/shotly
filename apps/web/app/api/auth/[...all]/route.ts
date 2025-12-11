import { toNextJsHandler } from 'better-auth/next-js';

import { auth } from '@/infrastructure/services/auth/auth';

export const { POST, GET } = toNextJsHandler(auth);
