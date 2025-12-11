import { VisibilityStatus } from '@/entities/models/common';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import { imageStorage } from '@/infrastructure/services/image-storage-service';

import { PERMANENT_COVER_IMAGE_STORAGE_PATH } from '../images/constants';

export const createServiceUseCase = async (
  userId: string,
  input: {
    tmpCoverImageUrl: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    deliveryTimeInDays: number;
    visibilityStatus: VisibilityStatus;
    features: string[];
    categoryId: string;
  },
) => {
  const { url: permanentCoverImageUrl } = await imageStorage.move(
    input.tmpCoverImageUrl,
    {
      folder: PERMANENT_COVER_IMAGE_STORAGE_PATH,
    },
  );

  await servicesRepository.createService(userId, {
    ...input,
    coverImageUrl: permanentCoverImageUrl,
  });
};
