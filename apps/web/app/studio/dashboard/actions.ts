'use server';

import { revalidatePath } from 'next/cache';

import { sendProfileToReviewUseCase } from '@/application/use-cases/account';
import { getUser } from '@/infrastructure/services/auth/dal';

export const sendProfileToReviewAction = async () => {
  const user = await getUser();

  await sendProfileToReviewUseCase(user.id);

  revalidatePath('/studio/dashboard');

  return { success: true };
};
