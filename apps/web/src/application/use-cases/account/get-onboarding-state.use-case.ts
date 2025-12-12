import { Collection } from '@/entities/models/collection';
import { VisibilityStatus } from '@/entities/models/common';
import { Service } from '@/entities/models/service';
import { UserProfile } from '@/entities/models/user';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import servicesRepository from '@/infrastructure/repositories/services.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';

import { MIN_PHOTOS_ONBOARDING_THRESHOLD } from './constants';

type OnboardingState = {
  isProfileComplete: boolean;
  isPortfolioComplete: boolean;
  isServiceComplete: boolean;
};

const isProfileComplete = (userProfile: UserProfile) => {
  return (
    userProfile.coverImageUrl !== null &&
    userProfile.profileImageUrl !== null &&
    userProfile.bio !== null &&
    userProfile.bio.length > 0 &&
    userProfile.locations.length > 0 &&
    userProfile.languages.length > 0 &&
    userProfile.yearsOfExperience !== null &&
    userProfile.instagramTag !== null &&
    userProfile.aboutMe !== null
  );
};

const isPortfolioComplete = (collections: Collection[]) => {
  return collections.some(
    (collection) =>
      collection.visibilityStatus === VisibilityStatus.PUBLIC &&
      collection.photosCount > MIN_PHOTOS_ONBOARDING_THRESHOLD &&
      collection.archivedAt === null &&
      collection.coverPhotoId !== null,
  );
};

const isServiceComplete = (services: Service[]) => {
  return services.some(
    (service) => service.visibilityStatus === VisibilityStatus.PUBLIC,
  );
};

export const getOnboardingStateUseCase = async (
  userId: string,
): Promise<OnboardingState> => {
  const userProfile = await usersRepository.getUserProfile(userId);
  const collections = await collectionsRepository.getAllCollections(userId);
  const services = await servicesRepository.getAllServices(userId);

  return {
    isProfileComplete: isProfileComplete(userProfile),
    isPortfolioComplete: isPortfolioComplete(collections),
    isServiceComplete: isServiceComplete(services),
  };
};
