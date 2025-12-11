import { imageStorage } from '@/infrastructure/image-storage-service';
import { MimeType } from '@/utils/files/enums';

export const uploadImageUseCase = async (
  file: File,
  path: string,
  maxSize: number,
) => {
  const uploadResult = await imageStorage.upload(file, {
    folder: path,
    maxSize,
    allowedMimeTypes: [
      MimeType.JPEG,
      MimeType.JPG,
      MimeType.PNG,
      MimeType.WEBP,
    ],
  });

  return uploadResult;
};
