import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import servicesRepository from '@/infrastructure/repositories/services.repository';

export const archiveServiceUseCase = async (
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

  await servicesRepository.archiveService(serviceId);
};
