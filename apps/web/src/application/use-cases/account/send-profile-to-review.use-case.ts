import { ForbiddenError, NotFoundError } from '@/entities/errors/common';
import { ApprovalStatus } from '@/entities/models/user';
import usersRepository from '@/infrastructure/repositories/users.repository';

import { getOnboardingStateUseCase } from './get-onboarding-state.use-case';

export const sendProfileToReviewUseCase = async (userId: string) => {
  const user = await usersRepository.getUserById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.approvalStatus !== ApprovalStatus.NOT_SUBMITTED) {
    throw new ForbiddenError('Profile has already been sent to review once.');
  }

  const onboardingState = await getOnboardingStateUseCase(userId);

  const canSendProfileToReview =
    onboardingState.isProfileComplete &&
    onboardingState.isPortfolioComplete &&
    onboardingState.isServiceComplete;

  if (!canSendProfileToReview) {
    throw new ForbiddenError(
      'Onboarding is not complete. Complete all steps before sending profile to review.',
    );
  }

  await usersRepository.changeApprovalStatus(
    userId,
    ApprovalStatus.PENDING_REVIEW,
  );
};
