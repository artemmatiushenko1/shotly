import { ConflictError, NotFoundError } from '@/entities/errors/common';
import { LocationDetails } from '@/entities/models/locations';
import usersRepository from '@/infrastructure/repositories/users.repository';
import { imageStorage } from '@/infrastructure/services/image-storage-service';

import {
  PERMANENT_COVER_IMAGE_STORAGE_PATH,
  PERMANENT_PROFILE_IMAGE_STORAGE_PATH,
} from '../images/constants';

const updateProfileUseCase = async (
  userId: string,
  input: Partial<{
    name: string;
    username: string;
    profileImageUrl: string;
    coverImageUrl: string;
    languages: string[];
    locations: LocationDetails[];
    bio: string;
    websiteUrl: string;
    instagramTag: string;
    yearsOfExperience: number;
  }>,
) => {
  // TODO: should be a single transaction
  const user = await usersRepository.getUserById(userId);

  if (!user) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  if (input.username) {
    const userByUsername = await usersRepository.getUserByUsername(
      input.username,
    );

    if (userByUsername && userByUsername.id !== userId) {
      throw new ConflictError(`Username ${input.username} is already taken`);
    }
  }

  let coverImageUrl = user.coverImageUrl;

  if (input.coverImageUrl && coverImageUrl !== input.coverImageUrl) {
    const { url } = await imageStorage.move(input.coverImageUrl, {
      folder: PERMANENT_COVER_IMAGE_STORAGE_PATH,
    });

    coverImageUrl = url;
  }

  let profileImageUrl = user.profileImageUrl;

  if (input.profileImageUrl && profileImageUrl !== input.profileImageUrl) {
    const { url } = await imageStorage.move(input.profileImageUrl, {
      folder: PERMANENT_PROFILE_IMAGE_STORAGE_PATH,
    });

    profileImageUrl = url;
  }

  await usersRepository.updateUser(userId, {
    name: input.name,
    profileImageUrl,
    coverImageUrl,
    bio: input.bio,
    websiteUrl: input.websiteUrl,
    instagramTag: input.instagramTag,
    yearsOfExperience: input.yearsOfExperience,
  });

  if (input.languages) {
    await usersRepository.updateUserLanguages(userId, input.languages);
  }

  if (input.locations) {
    await usersRepository.updateUserLocations(userId, input.locations);
  }
};

export { updateProfileUseCase };
