import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const authConfig = NextAuth({
  providers: [Google],
  pages: {
    signIn: '/sign-in',
  },
});
