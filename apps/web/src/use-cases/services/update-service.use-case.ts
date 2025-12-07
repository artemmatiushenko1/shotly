import { ForbiddenError, NotFoundError } from '@/domain/errors/common';
import { CreateServiceInput } from '@/domain/service';
import { getUser } from '@/lib/auth/dal';
import servicesRepository from '@/repositories/services.repository';

const updateServiceUseCase = async (
  userId: string,
  serviceId: string,
  input: Partial<CreateServiceInput>,
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

  await servicesRepository.updateService(serviceId, input);
};

export default updateServiceUseCase;
