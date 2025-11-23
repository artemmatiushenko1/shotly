'use client';

import { StarIcon } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

type ReviewsSummaryProps = {
  averageRating: number;
  totalReviews: number;
};

function ReviewsSummary({ averageRating, totalReviews }: ReviewsSummaryProps) {
  const t = useTranslations('photographerProfile.reviews');

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-sidebar/80 p-8 rounded-2xl">
      <div className="text-center">
        <div className="text-5xl font-bold tracking-tight">{averageRating}</div>
        <div className="flex justify-center my-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <StarIcon
              key={s}
              className="w-5 h-5 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {t('verifiedReviews', { count: totalReviews })}
        </div>
      </div>
      <div className="flex-1 w-full max-w-sm">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3 text-sm">
              <span className="w-3 font-medium text-gray-600">{star}</span>
              <div className="flex-1 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: star === 5 ? '80%' : star === 4 ? '15%' : '5%',
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewsSummary;
