import MainHeader from '@/components/main-header';
import { getUser } from '@/lib/auth/dal';
import { getTranslations } from 'next-intl/server';
import OnboardingChecklist, { OnboardingStep } from './onboarding-checklist';
import usersRepository from '@/repositories/users.repository';
import collectionsRepository from '@/repositories/collections.repository';
import servicesRepository from '@/repositories/services.repository';
import { VisibilityStatus } from '@/domain/common';
import { Service, ServiceStatus } from '@/domain/service';
import { ApprovalStatus, UserProfile } from '@/domain/user';
import { Collection } from '@/domain/collection';
import ProfileUnderReviewCard from './profile-under-review';

type OnboardingState = {
  isProfileComplete: boolean;
  isPortfolioComplete: boolean;
  isServiceComplete: boolean;
};

// TODO: move these functions to the domain layer
const isProfileComplete = (userProfile: UserProfile) => {
  return (
    userProfile.coverImageUrl !== null &&
    userProfile.bio !== null &&
    userProfile.bio.length > 0 &&
    userProfile.locations.length > 0 &&
    userProfile.languages.length > 0 &&
    userProfile.yearsOfExperience !== null &&
    userProfile.instagramTag !== null &&
    userProfile.username !== null &&
    userProfile.username.length > 0
  );
};

const isPortfolioComplete = (collections: Collection[]) => {
  return collections.some(
    (collection) =>
      collection.visibilityStatus === VisibilityStatus.PUBLIC &&
      collection.photosCount > 10 &&
      collection.archivedAt === null,
  );
};

const isServiceComplete = (services: Service[]) => {
  return services.some((service) => service.status === ServiceStatus.PUBLIC);
};

const getOnboardingState = async (userId: string): Promise<OnboardingState> => {
  const userProfile = await usersRepository.getUserProfile(userId);
  const collections = await collectionsRepository.getAllCollections(userId);
  const services = await servicesRepository.getAllServices(userId);

  return {
    isProfileComplete: isProfileComplete(userProfile),
    isPortfolioComplete: isPortfolioComplete(collections),
    isServiceComplete: isServiceComplete(services),
  };
};

const getOnboardingStepsInfo = async (userId: string) => {
  const onboardingState = await getOnboardingState(userId);

  const steps: OnboardingStep[] = [
    {
      id: 'profile',
      title: 'Set up your public profile',
      description:
        'Add your profile picture, bio, and location so clients can find and trust you.',
      isComplete: onboardingState.isProfileComplete,
      actionLink: '/settings',
      actionLabel: 'Go to Profile',
    },
    {
      id: 'portfolio',
      title: 'Upload your portfolio',
      description:
        'Showcase your best work. We recommend at least 10 high-quality images.',
      isComplete: onboardingState.isPortfolioComplete,
      actionLink: '/portfolio',
      actionLabel: 'Go to Portfolio',
    },
    {
      id: 'service',
      title: 'Create your first service',
      description:
        'Define a package, like a "Portrait Session," with a price and details.',
      isComplete: onboardingState.isServiceComplete,
      actionLink: '/services',
      actionLabel: 'Go to Services',
    },
  ];

  const completedSteps = steps.filter((step) => step.isComplete).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  const allComplete = steps.every((step) => step.isComplete);

  return { steps, progressPercentage, allComplete };
};

async function Dashboard() {
  const user = await getUser();

  const onboardingStepsInfo = await getOnboardingStepsInfo(user.id);

  const t = await getTranslations('dashboard');

  let description = t('description', { name: user.name });

  if (user.approvalStatus === ApprovalStatus.NOT_SUBMITTED) {
    description +=
      ' Complete your profile to get approved and start booking clients.';
  }

  return (
    <>
      <MainHeader title={t('title')} caption={description} />
      <div className="max-w-2xl mx-auto p-4 translate-y-1/8">
        {user.approvalStatus === ApprovalStatus.NOT_SUBMITTED && (
          <OnboardingChecklist
            key={'onboarding-checklist'}
            steps={onboardingStepsInfo.steps}
            progressPercentage={onboardingStepsInfo.progressPercentage}
            allComplete={onboardingStepsInfo.allComplete}
          />
        )}
        {user.approvalStatus === ApprovalStatus.PENDING_REVIEW && (
          <ProfileUnderReviewCard
            key={'profile-under-review'}
            userEmail={user.email}
          />
        )}
      </div>
    </>
  );
}

export default Dashboard;
