import 'server-only';

import { IImageStorage } from './image-storage.interface';
import { LocalImageStorageService } from './local/local-image-storage.service';
import path from 'node:path';
import { serverEnv } from '@/env/server';

/**
 * Image storage service
 * This is the main entry point for image upload operations.
 * To change the storage provider, simply swap the implementation here.
 */
const uploadsFolderPath = path.join(process.cwd(), 'public', 'uploads');
const imageStorage: IImageStorage = new LocalImageStorageService(
  uploadsFolderPath,
  serverEnv.IMAGE_STORAGE_BASE_URL,
);

export default imageStorage;

export type {
  IImageStorage,
  UploadOptions,
  UploadResult,
} from './image-storage.interface';
