import { NotFoundError } from '@/entities/errors/common';
import usersRepository from '@/infrastructure/repositories/users.repository';

export const getProfileByUsernameOrIdUseCase = async (usernameOrId: string) => {
  const userByUsername = await usersRepository.getUserByUsername(usernameOrId);

  if (userByUsername) {
    return usersRepository.getUserProfile(userByUsername.id);
  }

  const profileByUserId = await usersRepository.getUserProfile(usernameOrId);

  if (!profileByUserId) {
    throw new NotFoundError('User not found');
  }

  return profileByUserId;
};
