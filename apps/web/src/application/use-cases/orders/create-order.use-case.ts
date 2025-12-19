import {
  DatabaseOperationError,
  NotFoundError,
} from '@/entities/errors/common';
import { CreateOrderInput } from '@/entities/models/order';
import ordersRepository from '@/infrastructure/repositories/orders.repository';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';

export const createOrderUseCase = async (
  input: Omit<CreateOrderInput, 'pricePerHour' | 'currency'>,
): Promise<string> => {
  const service = await servicesRepository.getServiceById(input.serviceId);
  if (!service) {
    throw new NotFoundError('Service not found');
  }

  const photographer = await usersRepository.getUserById(input.photographerId);
  if (!photographer) {
    throw new NotFoundError('Photographer not found');
  }

  const orderId = await ordersRepository.createOrder({
    ...input,
    pricePerHour: service.price,
    currency: service.currency,
  });

  if (!orderId) {
    throw new DatabaseOperationError('Failed to create order');
  }

  return orderId;
};
