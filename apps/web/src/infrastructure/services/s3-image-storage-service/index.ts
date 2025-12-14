import { serverEnv } from '@/env/server';

import { IImageStorage } from '../image-storage-service';
import { S3ImageStorageService } from './s3-image-storage.service';

const s3ImageStorage: IImageStorage = new S3ImageStorageService(
  serverEnv.S3_REGION,
  serverEnv.S3_ENDPOINT,
  serverEnv.S3_ACCESS_KEY,
  serverEnv.S3_SECRET_KEY,
  serverEnv.S3_PUBLIC_URL,
);

export { s3ImageStorage };
