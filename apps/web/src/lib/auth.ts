import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  plugins: [nextCookies()], // nextCookies should be last
  database: drizzleAdapter(db, { provider: 'pg', schema: { ...schema } }),
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
    },
  },
  emailAndPassword: { enabled: true },
});
