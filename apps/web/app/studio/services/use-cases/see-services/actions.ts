'use server';

import { getUser } from '@/lib/auth/dal';
import servicesRepository from '@/repositories/services.repository';
import { revalidatePath } from 'next/cache';

export const archiveService = async (
  state: {
    success: boolean;
    error: boolean;
  },
  serviceId: string,
) => {
  await getUser();

  try {
    // TODO: first check if it exists
    await servicesRepository.archiveService(serviceId);
    revalidatePath('/services');
    return { success: true, error: false };
  } catch (_: unknown) {
    return { success: false, error: true };
  }
};
