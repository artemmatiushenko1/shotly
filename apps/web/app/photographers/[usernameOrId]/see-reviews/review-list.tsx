import { useLocale } from 'next-intl';

import { ReviewWithAuthor } from '@/entities/models/review';

import { DateFormat, formatDate } from '@shotly/ui/lib/date';

import ReviewCard from './review-card';

type ReviewListProps = {
  reviews: ReviewWithAuthor[];
};

function ReviewList({ reviews }: ReviewListProps) {
  const locale = useLocale();

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          author={review.author.name}
          rating={review.rating}
          comment={review.comment}
          authorProfileImageUrl={review.author.profileImageUrl}
          date={formatDate(review.createdAt, locale, DateFormat.LONG)}
        />
      ))}
    </div>
  );
}

export default ReviewList;
