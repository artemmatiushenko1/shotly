'use server';

import { revalidatePath } from 'next/cache';

import { ApprovalStatus } from '@/entities/models/user';
import usersRepository from '@/infrastructure/repositories/users.repository';
import { getUser } from '@/infrastructure/services/auth/dal';

export const sendProfileToReview = async () => {
  const user = await getUser();

  await usersRepository.changeApprovalStatus(
    user.id,
    ApprovalStatus.PENDING_REVIEW,
  );

  revalidatePath('/studio/dashboard');

  return { success: true };
};
