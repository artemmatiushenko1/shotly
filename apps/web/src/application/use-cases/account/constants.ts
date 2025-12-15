import { mbToBytes } from '@/utils/files/utils';

export const MIN_USERNAME_LENGTH = 1;
export const MAX_USERNAME_LENGTH = 30;
export const DEFAULT_USERNAME_PREFIX = 'user_';
export const DEFAULT_USERNAME_LENGTH = 8;
export const ALLOWED_USERNAME_CHARS = '_.abcdefghijklmnopqrstuvwxyz0123456789';

export const MIN_PHOTOS_ONBOARDING_THRESHOLD = 10;

export const MAX_BIO_LENGTH = 100;
export const MAX_ABOUT_ME_LENGTH = 500;

export const DEFAULT_STORAGE_CAPACITY_BYTES = mbToBytes(1000);
