import { db } from '@/db/drizzle';
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from '@/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import Google, { GoogleProfile } from 'next-auth/providers/google';

export const authConfig = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  providers: [
    Google({
      profile: (profile: GoogleProfile) => {
        return {
          ...profile,
          firstName: profile.given_name,
          lastName: profile.family_name ?? '',
          image: profile.picture,
        };
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    session({ session, token, user }) {
      console.log({ token, user });

      if (user) {
        session.user.firstName = user.firstName;
        session.user.lastName = user.lastName;
      }

      return session;
    },
  },
});
