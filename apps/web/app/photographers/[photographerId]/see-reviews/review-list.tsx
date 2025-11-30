import React from 'react';
import ReviewCard, { ReviewCardProps } from './review-card';

export const MOCK_REVIEWS = [
  {
    id: 'r1',
    photographerId: 'p1',
    author: 'Олена Коваленко',
    avatar: 'https://ui-avatars.com/api/?name=O+K',
    rating: 5,
    date: 'Жовтень 12, 2023',
    text: 'Артем — просто знахідка! Він створив настільки комфортну атмосферу на весіллі, що ми навіть забули про хвилювання. Фотографії перевершили всі очікування: живі, теплі та дуже емоційні. Щиро дякуємо за ці спогади!',
  },
  {
    id: 'r2',
    photographerId: 'p1',
    author: 'Андрій Бойко',
    avatar: 'https://ui-avatars.com/api/?name=A+Б',
    rating: 5,
    date: 'Вересень 28, 2023',
    text: 'Справжній професіонал. Все пройшло чітко: пунктуально, креативно і без зайвої метушні. Потрібні були ділові портрети — результат отримав навіть швидше, ніж домовлялися. Однозначно рекомендую до співпраці.',
  },
  {
    id: 'r3',
    photographerId: 'p1',
    author: 'Марія Шевчук',
    avatar: 'https://ui-avatars.com/api/?name=M+Ш',
    rating: 4,
    date: 'Серпень 15, 2023',
    text: 'Дуже задоволена зйомкою та вайбом! Знімаю одну зірочку лише за невелику затримку з обробкою (чекали на 2 дні довше), але результат того вартий.',
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
