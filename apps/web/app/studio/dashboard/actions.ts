'use server';

import { ApprovalStatus } from '@/domain/user';
import { getUser } from '@/lib/auth/dal';
import usersRepository from '@/repositories/users.repository';
import { revalidatePath } from 'next/cache';

export const sendProfileToReview = async () => {
  const user = await getUser();

  await usersRepository.changeApprovalStatus(
    user.id,
    ApprovalStatus.PENDING_REVIEW,
  );

  revalidatePath('/studio/dashboard');

  return { success: true };
};
