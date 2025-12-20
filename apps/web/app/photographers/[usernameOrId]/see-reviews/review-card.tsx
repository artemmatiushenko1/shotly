import React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { StarRating } from '@shotly/ui/components/star-rating';

export type ReviewCardProps = {
  authorProfileImageUrl?: string | null;
  author: string;
  date: string;
  rating: number;
  comment: string;
};

function ReviewCard({
  authorProfileImageUrl,
  author,
  date,
  rating,
  comment,
}: ReviewCardProps) {
  return (
    <div className="border-b border-gray-100 pb-8 last:border-0">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 rounded-full">
            {authorProfileImageUrl && (
              <AvatarImage src={authorProfileImageUrl} alt={author} />
            )}
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{author}</h4>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex">
          <StarRating rating={rating} readonly size="sm" />
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">{comment}</p>
    </div>
  );
}

export default ReviewCard;
