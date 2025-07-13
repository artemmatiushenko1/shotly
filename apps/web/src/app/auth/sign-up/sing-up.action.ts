'use server';

import { db } from '@/db/drizzle';
import { usersTable } from '@/db/schema';
import { hash } from 'bcrypt';

const SALT_OR_ROUNDS = 10;

export const signUp = async (formData: FormData) => {
  const user = await db
    .insert(usersTable)
    .values({
      firstName: formData.get('firstName')?.toString() ?? ' ',
      lastName: formData.get('lastName')?.toString() ?? '',
      email: formData.get('email')?.toString() ?? '',
      passwordHash: await hash(
        formData.get('password')?.toString() ?? '',
        SALT_OR_ROUNDS,
      ),
    })
    .returning();

  console.log({ user });

  // if (response.status === 200) {
  //   redirect('/');
  // }
};
