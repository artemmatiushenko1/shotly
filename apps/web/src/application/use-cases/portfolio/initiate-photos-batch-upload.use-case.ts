import { DatabaseOperationError } from '@/entities/errors/common';
import { CreatePhotoInput } from '@/entities/models/photo';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';

import { PHOTOS_BUCKET_NAME } from '../images/constants';

export type InitiatePhotosBatchUploadInput = (Pick<
  CreatePhotoInput,
  'originalFilename' | 'format' | 'sizeInBytes'
> & {
  uploadId: string;
})[];

export const initiatePhotosBatchUploadUseCase = async (
  userId: string,
  collectionId: string,
  input: InitiatePhotosBatchUploadInput,
) => {
  const uploadRequests = await Promise.all(
    input.map(async (photo) => {
      return [
        photo.uploadId,
        await s3ImageStorage.prepareUpload(
          photo.originalFilename,
          photo.format,
          PHOTOS_BUCKET_NAME,
        ),
      ] as const;
    }),
  );

  const uploadRequestsMap = new Map(uploadRequests);
  const inputsMap = new Map(input.map((input) => [input.uploadId, input]));

  const createdPhotos = await Promise.all(
    input.map(async (input) => {
      const uploadRequest = uploadRequestsMap.get(input.uploadId);

      const inputData = inputsMap.get(input.uploadId);
      if (!uploadRequest || !inputData) {
        throw new Error('Upload request or input data not found');
      }

      const photo = await collectionsRepository.createPhoto(
        userId,
        collectionId,
        {
          format: inputData.format,
          url: uploadRequest.publicUrl,
          sizeInBytes: inputData.sizeInBytes,
          originalFilename: inputData.originalFilename,
          storageKey: uploadRequest.key,
        },
      );

      if (!photo) {
        throw new DatabaseOperationError('Failed to create photo');
      }

      return [input.uploadId, photo] as const;
    }),
  );

  const response = createdPhotos.map(([uploadId, photo]) => {
    const uploadRequest = uploadRequestsMap.get(uploadId);

    if (!uploadRequest) {
      throw new Error('Upload request not found');
    }

    return [
      uploadId,
      {
        photoId: photo.id,
        uploadUrl: uploadRequest.uploadUrl,
        storageKey: uploadRequest.key,
        originalFilename: photo.originalFilename,
        format: photo.format,
        sizeInBytes: photo.sizeInBytes,
        url: uploadRequest.publicUrl,
      },
    ] as const;
  });

  console.log(response);

  return new Map(response);
};
