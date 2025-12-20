import { ForbiddenError } from '@/entities/errors/common';
import { Role } from '@/entities/models/user';
import ordersRepository from '@/infrastructure/repositories/orders.repository';
import usersRepository from '@/infrastructure/repositories/users.repository';

import { getUserByIdUseCase } from './get-user-by-id.use-case';

export const revalidateReviewsCache = async (photographerId: string) => {
  const user = await getUserByIdUseCase(photographerId);

  if (user.role !== Role.PHOTOGRAPHER) {
    throw new ForbiddenError(
      'Can only revalidate reviews cache for photographers',
    );
  }

  const reviews =
    await ordersRepository.getReviewsByPhotographerId(photographerId);

  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  await usersRepository.updateRatingInfo(
    photographerId,
    totalReviews,
    averageRating.toFixed(1),
  );
};
