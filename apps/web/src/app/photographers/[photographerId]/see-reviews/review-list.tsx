import React from 'react';
import ReviewCard, { ReviewCardProps } from './review-card';

export const MOCK_REVIEWS = [
  {
    id: 'r1',
    photographerId: 'p1',
    author: 'Alice M.',
    avatar: 'https://ui-avatars.com/api/?name=Alice+M',
    rating: 5,
    date: 'Oct 12, 2023',
    text: 'Artem was absolutely amazing! He made us feel so comfortable during our wedding shoot. The photos turned out better than we could have imagined.',
  },
  {
    id: 'r2',
    photographerId: 'p1',
    author: 'John D.',
    avatar: 'https://ui-avatars.com/api/?name=John+D',
    rating: 5,
    date: 'Sep 28, 2023',
    text: 'Great professional. Punctual, creative, and very easy to work with. Highly recommended for any portrait work.',
  },
  {
    id: 'r3',
    photographerId: 'p1',
    author: 'Emma W.',
    avatar: 'https://ui-avatars.com/api/?name=Emma+W',
    rating: 4,
    date: 'Aug 15, 2023',
    text: 'Lovely photos and great vibe. Delivery took a couple of days longer than expected, but the quality was worth the wait.',
  },
];

type ReviewListProps = {
  reviews: ReviewCardProps[];
};

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </div>
  );
}

export default ReviewList;
