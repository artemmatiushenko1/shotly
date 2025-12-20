import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import { OrderStatus } from '@/entities/models/order';
import { Role } from '@/entities/models/user';
import ordersRepository from '@/infrastructure/repositories/orders.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';

import { getOrderByIdUseCase } from './get-order-by-id.use-case';

export const acceptOrderUseCase = async (
  authenticatedUserId: string,
  orderId: string,
) => {
  const user = await usersRepository.getUserById(authenticatedUserId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.role !== Role.PHOTOGRAPHER) {
    throw new ForbiddenError('Only photographers can accept orders');
  }

  const order = await getOrderByIdUseCase(authenticatedUserId, orderId);

  await ordersRepository.updateOrderStatus(order.id, OrderStatus.CONFIRMED);
};
