import 'next-auth';

declare module 'next-auth' {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    firstName: string;
    lastName: string;
  }

  interface Session {
    user: {} & DefaultU;
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    firstName: string;
    lastName: string;
  }
}
