import { NotFoundError } from '@/entities/errors/common';
import { VisibilityStatus } from '@/entities/models/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';

export const getProfilePageInfoByUsernameOrIdUseCase = async (
  usernameOrId: string,
) => {
  const user =
    (await usersRepository.getUserByUsername(usernameOrId)) ??
    (await usersRepository.getUserById(usernameOrId));

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const [profile, collections, services] = await Promise.all([
    usersRepository.getUserProfile(user.id),
    collectionsRepository.getAllCollections(user.id, VisibilityStatus.PUBLIC),
    servicesRepository.getAllServices(user.id, VisibilityStatus.PUBLIC),
  ]);

  return {
    profile,
    collections,
    services,
  };
};
