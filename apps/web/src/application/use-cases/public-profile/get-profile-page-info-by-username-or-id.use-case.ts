import { Locale } from '@/_i18n/config';
import { NotFoundError } from '@/entities/errors/common';
import { VisibilityStatus } from '@/entities/models/common';
import { ApprovalStatus } from '@/entities/models/user';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import ordersRepository from '@/infrastructure/repositories/orders.repository';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';

export const getProfilePageInfoByUsernameOrIdUseCase = async (
  usernameOrId: string,
  authenticatedUserId?: string,
  locale?: Locale,
) => {
  const user =
    (await usersRepository.getUserByUsername(usernameOrId)) ??
    (await usersRepository.getUserById(usernameOrId));

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (
    user.approvalStatus !== ApprovalStatus.APPROVED &&
    user.id !== authenticatedUserId
  ) {
    throw new NotFoundError('User not found');
  }

  const [profile, collections, services, reviews] = await Promise.all([
    usersRepository.getUserProfile(user.id),
    collectionsRepository.getAllCollections(user.id, VisibilityStatus.PUBLIC),
    servicesRepository.getAllServices(user.id, VisibilityStatus.PUBLIC),
    ordersRepository.getReviewsByPhotographerId(user.id),
  ]);

  return {
    photographerId: user.id,
    profile,
    collections: collections.map((collection) => ({
      ...collection,
      category: {
        id: collection.category.id,
        name:
          locale === 'uk'
            ? collection.category.nameUk
            : collection.category.name,
        nameUk: collection.category.nameUk,
      },
    })),
    services: services.map((service) => ({
      ...service,
      category: {
        id: service.category.id,
        name: locale === 'uk' ? service.category.nameUk : service.category.name,
        nameUk: service.category.nameUk,
      },
    })),
    reviews,
  };
};
