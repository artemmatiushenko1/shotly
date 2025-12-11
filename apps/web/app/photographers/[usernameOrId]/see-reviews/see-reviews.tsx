import React from 'react';

import ReviewList, { MOCK_REVIEWS } from './review-list';
import ReviewsSummary from './reviews-summary';

function SeeReviews() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <ReviewsSummary averageRating={4.5} totalReviews={10} />
      <ReviewList reviews={MOCK_REVIEWS} />
    </div>
  );
}

export default SeeReviews;
