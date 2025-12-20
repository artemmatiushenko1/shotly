import React from 'react';

import { ReviewWithAuthor } from '@/entities/models/review';

import ReviewList from './review-list';
import ReviewsSummary from './reviews-summary';

type SeeReviewsProps = {
  reviews: ReviewWithAuthor[];
};
function SeeReviews({ reviews }: SeeReviewsProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ReviewsSummary reviews={reviews} />
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default SeeReviews;
