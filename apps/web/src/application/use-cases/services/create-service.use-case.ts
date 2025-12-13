import {
  CreateServiceInput,
  createServiceInputSchema,
} from '@/entities/models/service';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import { imageStorage } from '@/infrastructure/services/image-storage-service';

import { PERMANENT_COVER_IMAGE_STORAGE_PATH } from '../images/constants';

export const createServiceUseCase = async (
  userId: string,
  input: Omit<CreateServiceInput, 'coverImageUrl'> & {
    tmpCoverImageUrl: string;
  },
) => {
  const { url: permanentCoverImageUrl } = await imageStorage.move(
    input.tmpCoverImageUrl,
    {
      folder: PERMANENT_COVER_IMAGE_STORAGE_PATH,
    },
  );

  await servicesRepository.createService(
    userId,
    createServiceInputSchema.parse({
      ...input,
      coverImageUrl: permanentCoverImageUrl,
    }),
  );
};
