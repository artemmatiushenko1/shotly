import {
  COVER_IMAGES_BUCKET_NAME,
  PHOTOS_BUCKET_NAME,
  PROFILE_IMAGES_BUCKET_NAME,
} from '@/application/use-cases/images/constants';
import { serverEnv } from '@/env/server';

import { S3ImageStorageService } from './s3-image-storage.service';

const s3ImageStorage = new S3ImageStorageService(
  serverEnv.S3_REGION,
  serverEnv.S3_ENDPOINT,
  serverEnv.S3_ACCESS_KEY,
  serverEnv.S3_SECRET_KEY,
  serverEnv.S3_PUBLIC_URL,
);

[
  PHOTOS_BUCKET_NAME,
  COVER_IMAGES_BUCKET_NAME,
  PROFILE_IMAGES_BUCKET_NAME,
].forEach(async (bucketName) => {
  await s3ImageStorage.createBucket(bucketName);
});

export { s3ImageStorage };
