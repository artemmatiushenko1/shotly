'use server';
import { authConfig } from '@/auth';

export const signIn = async () => {
  await authConfig.signIn('google', { redirectTo: '/' });
};
