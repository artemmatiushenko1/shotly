import Image from 'next/image';
import React from 'react';

import { StarRating } from '@shotly/ui/components/star-rating';

export type ReviewCardProps = {
  id: string;
  avatar: string;
  author: string;
  date: string;
  rating: number;
  text: string;
};

function ReviewCard({
  id,
  avatar,
  author,
  date,
  rating,
  text,
}: ReviewCardProps) {
  return (
    <div key={id} className="border-b border-gray-100 pb-8 last:border-0">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Image
            unoptimized
            width={40}
            height={40}
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full bg-gray-100"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{author}</h4>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex">
          <StarRating rating={rating} readonly size="sm" />
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

export default ReviewCard;
