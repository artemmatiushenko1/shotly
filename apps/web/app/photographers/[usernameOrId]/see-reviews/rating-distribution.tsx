import React from 'react';

import { ReviewCardProps } from './review-card';

type RatingDistributionProps = {
  reviews: Pick<ReviewCardProps, 'rating'>[];
};

function RatingDistribution({ reviews }: RatingDistributionProps) {
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => review.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="flex-1 w-full max-w-sm">
      <div className="space-y-2">
        {distribution.map(({ star, percentage }) => (
          <div key={star} className="flex items-center gap-3 text-sm">
            <span className="w-3 font-medium text-gray-600">{star}</span>
            <div className="flex-1 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingDistribution;
