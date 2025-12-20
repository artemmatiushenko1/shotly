'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { ReviewWithAuthor } from '@/entities/models/review';

import { StarRating } from '@shotly/ui/components/star-rating';

import RatingDistribution from './rating-distribution';

type ReviewsSummaryProps = {
  reviews: ReviewWithAuthor[];
};

function ReviewsSummary({ reviews }: ReviewsSummaryProps) {
  const t = useTranslations('photographerProfile.reviews');

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-sidebar/80 p-8 rounded-2xl">
      <div className="text-center">
        <div className="text-5xl font-bold tracking-tight">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex justify-center my-2">
          <StarRating rating={averageRating} readonly size="lg" />
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {t('verifiedReviews', { count: totalReviews })}
        </div>
      </div>
      <RatingDistribution reviews={reviews} />
    </div>
  );
}

export default ReviewsSummary;
