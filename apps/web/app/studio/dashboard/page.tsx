import { getTranslations } from 'next-intl/server';

import { getOnboardingStateUseCase } from '@/application/use-cases/account';
import { ApprovalStatus } from '@/entities/models/user';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

import MainHeader from '../../_components/main-header';
import OnboardingChecklist, { OnboardingStep } from './onboarding-checklist';
import ProfileUnderReviewCard from './profile-under-review';

const getOnboardingStepsInfo = async (
  userId: string,
  t: Awaited<ReturnType<typeof getTranslations>>,
) => {
  const onboardingState = await getOnboardingStateUseCase(userId);

  const steps: OnboardingStep[] = [
    {
      id: 'profile',
      title: t('onboarding.steps.profile.title'),
      description: t('onboarding.steps.profile.description'),
      isComplete: onboardingState.isProfileComplete,
      actionLink: '/studio/settings',
      actionLabel: t('onboarding.steps.profile.actionLabel'),
    },
    {
      id: 'portfolio',
      title: t('onboarding.steps.portfolio.title'),
      description: t('onboarding.steps.portfolio.description'),
      isComplete: onboardingState.isPortfolioComplete,
      actionLink: '/studio/portfolio',
      actionLabel: t('onboarding.steps.portfolio.actionLabel'),
    },
    {
      id: 'service',
      title: t('onboarding.steps.service.title'),
      description: t('onboarding.steps.service.description'),
      isComplete: onboardingState.isServiceComplete,
      actionLink: '/studio/services',
      actionLabel: t('onboarding.steps.service.actionLabel'),
    },
  ];

  const completedSteps = steps.filter((step) => step.isComplete).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  const allComplete = steps.every((step) => step.isComplete);

  return { steps, progressPercentage, allComplete };
};

async function Dashboard() {
  const user = await getAuthenticatedUserOrRedirect();

  const t = await getTranslations('dashboard');
  const onboardingStepsInfo = await getOnboardingStepsInfo(user.id, t);

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
