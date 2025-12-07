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
const persistentUploadsFolderPath = path.join(
  process.cwd(),
  'public',
  'uploads',
);
export const persistentImageStorage: IImageStorage =
  new LocalImageStorageService(
    persistentUploadsFolderPath,
    serverEnv.IMAGE_STORAGE_BASE_URL + '/uploads',
  );

const tmpUploadsFolderPath = path.join(process.cwd(), 'public', 'tmp');
export const tmpImageStorage: IImageStorage = new LocalImageStorageService(
  tmpUploadsFolderPath,
  serverEnv.IMAGE_STORAGE_BASE_URL + '/tmp',
);

export type {
  IImageStorage,
  UploadOptions,
  UploadResult,
} from './image-storage.interface';
