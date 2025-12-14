import { ConflictError, NotFoundError } from '@/entities/errors/common';
import { LocationDetails } from '@/entities/models/locations';
import usersRepository from '@/infrastructure/repositories/users.repository';

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
    aboutMe: string;
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

  await usersRepository.updateUser(userId, {
    username: input.username,
    name: input.name,
    profileImageUrl: input.profileImageUrl,
    coverImageUrl: input.coverImageUrl,
    bio: input.bio,
    websiteUrl: input.websiteUrl,
    instagramTag: input.instagramTag,
    yearsOfExperience: input.yearsOfExperience,
    aboutMe: input.aboutMe,
  });

  if (input.languages) {
    await usersRepository.updateUserLanguages(userId, input.languages);
  }

  if (input.locations) {
    await usersRepository.updateUserLocations(userId, input.locations);
  }
};

export { updateProfileUseCase };
