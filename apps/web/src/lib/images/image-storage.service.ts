import 'server-only';
import path from 'node:path';

import { serverEnv } from '@/env/server';

import { IImageStorage } from './image-storage.interface';
import { LocalImageStorageService } from './local/local-image-storage.service';

/**
 * Image storage service
 * This is the main entry point for image upload operations.
 * To change the storage provider, simply swap the implementation here.
 */

const imageStorageFolderPath = path.join(process.cwd(), 'public');
export const imageStorage: IImageStorage = new LocalImageStorageService(
  imageStorageFolderPath,
  serverEnv.IMAGE_STORAGE_BASE_URL,
);

export type {
  IImageStorage,
  UploadOptions,
  UploadResult,
} from './image-storage.interface';
