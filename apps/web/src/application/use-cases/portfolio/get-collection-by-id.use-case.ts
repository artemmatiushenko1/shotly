import { Locale } from '@/_i18n/config';
import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';

export const getCollectionByIdUseCase = async (
  authUserId: string,
  collectionId: string,
  locale?: Locale,
) => {
  const collection =
    await collectionsRepository.getCollectionById(collectionId);

  if (!collection) {
    throw new NotFoundError('Collection not found');
  }

  if (collection.photographerId !== authUserId) {
    throw new ForbiddenError('You are not allowed to access this collection');
  }

  return {
    ...collection,
    category: {
      id: collection.category.id,
      name:
        locale === 'uk' ? collection.category.nameUk : collection.category.name,
      nameUk: collection.category.nameUk,
    },
  };
};
