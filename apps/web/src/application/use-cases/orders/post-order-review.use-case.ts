import ordersRepository from '@/infrastructure/repositories/orders.repository';

import { getUserByIdUseCase } from '../account';
import { getOrderByIdUseCase } from './get-order-by-id.use-case';

export const postOrderReviewUseCase = async (
  authenticatedUserId: string,
  orderId: string,
  rating: number,
  comment: string,
) => {
  const user = await getUserByIdUseCase(authenticatedUserId);
  const order = await getOrderByIdUseCase(authenticatedUserId, orderId);

  if (user.id !== order.client.id) {
    throw new Error('Only the client can post a review for an order');
  }

  await ordersRepository.createOrderReview({
    orderId,
    rating,
    comment,
  });
};
