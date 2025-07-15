'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const signUp = async (formData: FormData) => {
  const response = await auth.api.signUpEmail({
    body: {
      email: formData.get('email')?.toString() ?? '',
      password: formData.get('password')?.toString() ?? '',
      name: `${formData.get('firstName')?.toString() ?? ''} ${formData.get('lastName')?.toString() ?? ''}`,
      callbackURL: 'http://localhost:3000/',
    },
  });

  if (response.token) {
    redirect('http://localhost:3000/');
  }
};
