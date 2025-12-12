import usersRepository from '@/infrastructure/repositories/users.repository';

export const advanceStorageUsageUseCase = async (
  userId: string,
  bytes: number,
): Promise<void> => {
  await usersRepository.updateStorageUsage(userId, bytes);
};
