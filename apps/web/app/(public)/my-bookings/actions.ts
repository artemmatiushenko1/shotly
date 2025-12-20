'use server';

import { revalidatePath } from 'next/cache';

import { cancelOrderUseCase } from '@/application/use-cases/orders';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

export const cancelOrderAction = async (orderId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  const user = await getAuthenticatedUserOrRedirect();

  await cancelOrderUseCase(user.id, orderId);

  revalidatePath('/my-bookings');
};
