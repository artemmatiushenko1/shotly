'use server';

import { revalidatePath } from 'next/cache';

import {
  acceptOrderUseCase,
  cancelOrderUseCase,
} from '@/application/use-cases/orders';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

export const acceptOrderAction = async (orderId: string) => {
  const user = await getAuthenticatedUserOrRedirect();

  await acceptOrderUseCase(user.id, orderId);

  revalidatePath('/studio/orders');
};

export const rejectOrderAction = async (orderId: string) => {
  const user = await getAuthenticatedUserOrRedirect();

  await cancelOrderUseCase(user.id, orderId);

  revalidatePath('/studio/orders');
};
