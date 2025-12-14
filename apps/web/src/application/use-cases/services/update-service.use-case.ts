import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import {
  UpdateServiceInput,
  updateServiceInputSchema,
} from '@/entities/models/service';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import { getUser } from '@/infrastructure/services/auth/dal';

export const updateServiceUseCase = async (
  userId: string,
  serviceId: string,
  input: UpdateServiceInput,
) => {
  await getUser();

  const service = await servicesRepository.getServiceById(serviceId);

  if (!service) {
    throw new NotFoundError('Service not found');
  }

  if (service.photographerId !== userId) {
    throw new ForbiddenError(
      `User ${userId} is not the owner of service ${serviceId}`,
    );
  }

  await servicesRepository.updateService(
    serviceId,
    updateServiceInputSchema.parse(input),
  );
};
