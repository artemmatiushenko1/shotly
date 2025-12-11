import { MimeType } from '@/lib/files/enums';
import { imageStorage } from '@/lib/images/image-storage.service';

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
