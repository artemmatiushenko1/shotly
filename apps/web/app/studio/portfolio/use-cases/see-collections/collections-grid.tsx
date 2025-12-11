'use client';

import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';

import { Category } from '@/entities/models/category';
import { Collection } from '@/entities/models/collection';
import { VisibilityStatus } from '@/entities/models/common';
import { formatDateWithOrdinal } from '@/utils/date-formatting';

import CollectionCard from './collection-card';
import Empty from './empty';

type CollectionsGridProps = {
  collections: Collection[];
  collectionIdToCoverPhotoUrlMap: Record<string, string>;
  categories: Category[];
};

const CollectionsGrid = ({
  collections,
  collectionIdToCoverPhotoUrlMap,
  categories,
}: CollectionsGridProps) => {
  if (collections.length === 0) {
    return <Empty categories={categories} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 pt-4">
      {collections.map((collection) => (
        <ViewTransition key={collection.id} name={collection.id}>
          <Link key={collection.id} href={`/portfolio/${collection.id}`}>
            <CollectionCard
              isPublic={collection.visibilityStatus === VisibilityStatus.PUBLIC}
              title={collection.name}
              description={collection.description ?? ''}
              imagesCount={collection.photosCount}
              createdAt={formatDateWithOrdinal(collection.shootDate)}
              coverImageUrl={
                collectionIdToCoverPhotoUrlMap[collection.id] ?? ''
              }
            />
          </Link>
        </ViewTransition>
      ))}
    </div>
  );
};

export { CollectionsGrid };
