import ordersRepository from '@/infrastructure/repositories/orders.repository';

export const getPhotographerOrdersUseCase = async (photographerId: string) => {
  const orders = await ordersRepository.getPhotographerOrders(photographerId);
  return orders;
};
