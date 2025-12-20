'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { StarRating } from '@shotly/ui/components/star-rating';

import RatingDistribution from './rating-distribution';

type ReviewsSummaryProps = {
  averageRating: number;
  totalReviews: number;
  reviews: Array<{ rating: number }>;
};

function ReviewsSummary({
  averageRating,
  totalReviews,
  reviews,
}: ReviewsSummaryProps) {
  const t = useTranslations('photographerProfile.reviews');

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-sidebar/80 p-8 rounded-2xl">
      <div className="text-center">
        <div className="text-5xl font-bold tracking-tight">{averageRating}</div>
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
