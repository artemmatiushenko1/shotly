'use server';

import { updateUserController } from '@/controllers/users/update-my-profile.controller';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const updateProfileAction = async (form: FormData) => {
  const data = Object.fromEntries(form.entries());
  const session = await auth.api.getSession({ headers: await headers() });

  await updateUserController(data, session?.user.id);
};
