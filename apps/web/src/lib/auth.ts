import { db } from '@/db/drizzle';
import { schema } from '@/db/schema';
import { serverEnv } from '@/env/server';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
  plugins: [nextCookies()], // nextCookies should be last
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.usersTable,
      account: schema.accountsTable,
      verification: schema.verificationsTable,
      session: schema.sessionsTable,
    },
  }),
  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_AUTH_CLIENT_SECRET,
    },
  },
  emailAndPassword: { enabled: true },
});
