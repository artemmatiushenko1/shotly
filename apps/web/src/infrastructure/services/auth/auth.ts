import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';

import { setInitialUsernameUseCase } from '@/application/use-cases/account';
import { serverEnv } from '@/env/server';

import { db } from '../../../../drizzle';
import { schema } from '../../../../drizzle/schema';

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
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await setInitialUsernameUseCase(user.id);
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
      approvalStatus: {
        type: 'string',
        input: false,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_AUTH_CLIENT_SECRET,
    },
  },
  emailAndPassword: { enabled: true },
});
