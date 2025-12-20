import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import ordersRepository from '@/infrastructure/repositories/orders.repository';

export const getOrderByIdUseCase = async (
  authenticatedUserId: string,
  orderId: string,
) => {
  const order = await ordersRepository.getOrderById(orderId);
  if (!order) {
    throw new NotFoundError('Order not found');
  }

  if (
    order.photographer.id !== authenticatedUserId ||
    order.client.id !== authenticatedUserId
  ) {
    throw new ForbiddenError('You are not allowed to access this order');
  }

  return order;
};
