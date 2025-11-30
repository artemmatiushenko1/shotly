import { ForbiddenError, NotFoundError } from '@/domain/errors/common';
import servicesRepository from '@/repositories/services.repository';

// TODO: make restore service use case used in the frontend
export const restoreServiceUseCase = async (
  userId: string,
  serviceId: string,
) => {
  const service = await servicesRepository.getServiceById(serviceId);

  if (!service) {
    throw new NotFoundError(`Service with id ${serviceId} not found`);
  }

  if (service.photographerId !== userId) {
    throw new ForbiddenError(
      `User ${userId} is not the owner of service ${serviceId}`,
    );
  }

  await servicesRepository.restoreService(serviceId);
};
