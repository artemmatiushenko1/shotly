import { StorageUsage } from '@/entities/models/user';
import usersRepository from '@/infrastructure/repositories/users.repository';

export const getStorageUsageUseCase = async (
  userId: string,
): Promise<StorageUsage> => {
  const storageUsage = await usersRepository.getStorageUsage(userId);
  return storageUsage;
};
