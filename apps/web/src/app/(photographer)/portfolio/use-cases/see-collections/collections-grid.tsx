'use client';

import Link from 'next/link';
import CollectionCard from './collection-card';
import Empty from './empty';
import { Collection } from '@/domain/collection';
import { VisibilityStatus } from '@/domain/common';
import { formatDateWithOrdinal } from '@/utils/date-formatting';
import { unstable_ViewTransition as ViewTransition } from 'react';

type CollectionsGridProps = {
  collections: Collection[];
  collectionIdToCoverPhotoUrlMap: Record<string, string>;
};

const CollectionsGrid = ({
  collections,
  collectionIdToCoverPhotoUrlMap,
}: CollectionsGridProps) => {
  if (collections.length === 0) {
    return <Empty />;
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
