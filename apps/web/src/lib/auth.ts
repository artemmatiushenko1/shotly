import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { env } from '@/env';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  plugins: [nextCookies()], // nextCookies should be last
  database: drizzleAdapter(db, { provider: 'pg', schema: { ...schema } }),
  socialProviders: {
    google: {
      clientId: env.auth.google.clientId ?? '',
      clientSecret: env.auth.google.clientSecret ?? '',
    },
  },
  emailAndPassword: { enabled: true },
});
