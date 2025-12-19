import ordersRepository from '@/infrastructure/repositories/orders.repository';

export const getClientOrdersUseCase = async (clientId: string) => {
  const orders = await ordersRepository.getClientOrders(clientId);
  return orders;
};
