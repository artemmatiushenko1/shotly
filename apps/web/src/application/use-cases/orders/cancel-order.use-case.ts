import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from '@/entities/errors/common';
import { OrderStatus } from '@/entities/models/order';
import ordersRepository from '@/infrastructure/repositories/orders.repository';

export const cancelOrderUseCase = async (
  authenticatedUserId: string,
  orderId: string,
) => {
  const order = await ordersRepository.getOrderById(orderId);
  if (!order) {
    throw new NotFoundError('Order not found');
  }

  if (order.client.id !== authenticatedUserId) {
    throw new ForbiddenError('You are not allowed to cancel this order');
  }

  if (order.status !== OrderStatus.PENDING) {
    throw new ConflictError('You can only cancel pending orders');
  }

  await ordersRepository.updateOrderStatus(orderId, OrderStatus.CANCELLED);
};
