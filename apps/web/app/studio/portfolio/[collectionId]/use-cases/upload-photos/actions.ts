'use server';

import { initiatePhotosBatchUploadUseCase } from '@/application/use-cases/portfolio';
import { BatchUploadItem } from '@/application/use-cases/portfolio/initiate-photos-batch-upload.use-case';

export const initiatePhotosBatchUploadAction = async (
  userId: string,
  collectionId: string,
  items: BatchUploadItem[],
) => {
  return await initiatePhotosBatchUploadUseCase(userId, collectionId, items);
};
