'use server';

import { getUser } from '@/lib/auth/dal';
import { archiveServiceUseCase } from '@/use-cases/services/archive-service.use-case';
import { revalidatePath } from 'next/cache';

export const archiveService = async (
  state: {
    success: boolean;
    error: boolean;
  },
  serviceId: string,
) => {
  try {
    const user = await getUser();
    await archiveServiceUseCase(user.id, serviceId);
    revalidatePath('/services');
    return { success: true, error: false };
  } catch (_: unknown) {
    return { success: false, error: true };
  }
};
