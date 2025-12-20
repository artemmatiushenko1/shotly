import { NotFoundError } from '@/entities/errors/common';
import usersRepository from '@/infrastructure/repositories/users.repository';

export const getUserByIdUseCase = async (userId: string) => {
  const user = await usersRepository.getUserById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
};
