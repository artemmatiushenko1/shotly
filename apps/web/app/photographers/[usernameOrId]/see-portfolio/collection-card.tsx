import Image from 'next/image';
import React from 'react';

import { Category } from '@/entities/models/category';

type CollectionCardProps = {
  id: string;
  coverPhotoUrl: string;
  title: string;
  description?: string | null;
  photosCount: number;
  updatedAt: Date;
  category: Category;
};

function CollectionCard({
  id,
  coverPhotoUrl,
  title,
  photosCount,
  category,
}: CollectionCardProps) {
  return (
    <div key={id} className="group cursor-pointer flex flex-col gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          unoptimized
          width={300}
          height={300}
          src={coverPhotoUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      <div>
        <h3 className="font-bold group-hover:text-primary transition-colors text-lg leading-snug">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <span>{photosCount} Photos</span>
          <span>•</span>
          <span>{category.name}</span>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
