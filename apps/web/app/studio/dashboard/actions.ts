'use server';

import { revalidatePath } from 'next/cache';

import { ApprovalStatus } from '@/domain/user';
import { getUser } from '@/infrastructure/services/auth/dal';
import usersRepository from '@/repositories/users.repository';

export const sendProfileToReview = async () => {
  const user = await getUser();

  await usersRepository.changeApprovalStatus(
    user.id,
    ApprovalStatus.PENDING_REVIEW,
  );

  revalidatePath('/studio/dashboard');

  return { success: true };
};
