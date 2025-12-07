'use server';

import { getUser } from '@/lib/auth/dal';
import {
  archiveServiceUseCase,
  restoreServiceUseCase,
} from '@/application/use-cases/services';
import { revalidatePath } from 'next/cache';

export const archiveServiceAction = async (serviceId: string) => {
  try {
    const user = await getUser();
    await archiveServiceUseCase(user.id, serviceId);
    revalidatePath('/services');
    return { success: true };
  } catch (_: unknown) {
    return { success: false };
  }
};

export const restoreServiceAction = async (serviceId: string) => {
  try {
    const user = await getUser();
    await restoreServiceUseCase(user.id, serviceId);
    revalidatePath('/services');
    return { success: true };
  } catch (_: unknown) {
    return { success: false };
  }
};
