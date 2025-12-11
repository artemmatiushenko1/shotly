import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import { VisibilityStatus } from '@/entities/models/common';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import { getUser } from '@/infrastructure/services/auth/dal';
import { imageStorage } from '@/infrastructure/services/image-storage-service';

import { PERMANENT_COVER_IMAGE_STORAGE_PATH } from '../images/constants';

export const updateServiceUseCase = async (
  userId: string,
  serviceId: string,
  input: Partial<{
    coverImageUrl: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    deliveryTimeInDays: number;
    visibilityStatus: VisibilityStatus;
    features: string[];
    categoryId: string;
  }>,
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

  let coverImageUrl = service.coverImageUrl;

  if (input.coverImageUrl && service.coverImageUrl !== input.coverImageUrl) {
    const { url } = await imageStorage.move(input.coverImageUrl, {
      folder: PERMANENT_COVER_IMAGE_STORAGE_PATH,
    });

    coverImageUrl = url;
  }

  await servicesRepository.updateService(serviceId, {
    ...input,
    coverImageUrl,
  });
};
