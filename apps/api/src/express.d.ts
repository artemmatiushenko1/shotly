import { AuthUser } from './auth/types/auth-user.type';

declare module 'express' {
  interface Request {
    user?: AuthUser;
  }
}
