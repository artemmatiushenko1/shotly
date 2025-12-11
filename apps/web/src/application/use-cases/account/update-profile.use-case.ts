import { LocationDetails } from '@/entities/models/locations';
import usersRepository from '@/infrastructure/repositories/users.repository';

const updateProfileUseCase = async (
  userId: string,
  input: Partial<{
    name: string;
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
  // TODO: move tmp profile and cover images to permanent storage
  // TODO: check username availability
  // TODO: should be a single transaction
  await usersRepository.updateUser(userId, {
    name: input.name,
    image: input.profileImageUrl,
    coverImageUrl: input.coverImageUrl,
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
