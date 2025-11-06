'use server';

import { UnauthenticatedError } from '@/domain/errors/auth';
import { auth } from '@/lib/auth/auth';
import servicesRepository from '@/repositories/services.repository';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const archiveService = async (
  state: {
    success: boolean;
    error: boolean;
  },
  serviceId: string,
) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new UnauthenticatedError('User must be logged in to create service!');
  }

  try {
    // TODO: first check if it exists
    await servicesRepository.archiveService(serviceId);
    revalidatePath('/services');
    return { success: true, error: false };
  } catch (error: unknown) {
    console.log({ error });
    return { success: false, error: true };
  }
};
