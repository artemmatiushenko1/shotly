import { Locale } from '@/_i18n/config';
import { NotFoundError } from '@/entities/errors/common';
import usersRepository from '@/infrastructure/repositories/users.repository';

export const getProfileByUsernameOrIdUseCase = async (
  usernameOrId: string,
  locale: Locale,
) => {
  const userByUsername = await usersRepository.getUserByUsername(usernameOrId);

  if (userByUsername) {
    return usersRepository.getUserProfile(userByUsername.id);
  }

  const profileByUserId = await usersRepository.getUserProfile(usernameOrId);

  if (!profileByUserId) {
    throw new NotFoundError('User not found');
  }

  return {
    ...profileByUserId,
    languages: profileByUserId.languages.map((language) => ({
      ...language,
      name: locale === 'uk' ? language.nameUk : language.name,
    })),
  };
};
