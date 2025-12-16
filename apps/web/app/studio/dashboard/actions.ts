'use server';

import { revalidatePath } from 'next/cache';

import { sendProfileToReviewUseCase } from '@/application/use-cases/account';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

export const sendProfileToReviewAction = async () => {
  const user = await getAuthenticatedUserOrRedirect();

  await sendProfileToReviewUseCase(user.id);

  revalidatePath('/studio/dashboard');

  return { success: true };
};
