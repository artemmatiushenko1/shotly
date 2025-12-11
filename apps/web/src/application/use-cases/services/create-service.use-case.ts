import { VisibilityStatus } from '@/domain/common';
import { imageStorage } from '@/infrastructure/image-storage-service';
import servicesRepository from '@/repositories/services.repository';

import { PERMANENT_COVER_IMAGE_STORAGE_PATH } from './constants';

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
