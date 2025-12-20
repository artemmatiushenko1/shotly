import { ForbiddenError } from '@/entities/errors/common';
import { OrderStatus } from '@/entities/models/order';
import { Role } from '@/entities/models/user';
import ordersRepository from '@/infrastructure/repositories/orders.repository';

import { getUserByIdUseCase } from '../account';
import { getOrderByIdUseCase } from './get-order-by-id.use-case';

export const completeOrderUseCase = async (
  authenticatedUserId: string,
  orderId: string,
) => {
  const user = await getUserByIdUseCase(authenticatedUserId);
  if (user.role !== Role.PHOTOGRAPHER) {
    throw new ForbiddenError('User is not a photographer');
  }

  const order = await getOrderByIdUseCase(authenticatedUserId, orderId);
  if (order.status !== OrderStatus.CONFIRMED) {
    throw new ForbiddenError('Order is not confirmed');
  }

  await ordersRepository.updateOrderStatus(orderId, OrderStatus.COMPLETED);

  return order;
};
