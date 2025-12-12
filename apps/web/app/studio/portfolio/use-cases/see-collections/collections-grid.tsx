'use client';

import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';

import { Collection } from '@/entities/models/collection';
import { VisibilityStatus } from '@/entities/models/common';
import { formatDateWithOrdinal } from '@/utils/date-formatting';

import CollectionCard from './collection-card';

type CollectionsGridProps = {
  collections: Collection[];
};

const CollectionsGrid = ({ collections }: CollectionsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 pt-4">
      {collections.map((collection) => (
        <ViewTransition key={collection.id} name={collection.id}>
          <Link key={collection.id} href={`/studio/portfolio/${collection.id}`}>
            <CollectionCard
              isPublic={collection.visibilityStatus === VisibilityStatus.PUBLIC}
              title={collection.name}
              description={collection.description ?? ''}
              imagesCount={collection.photosCount}
              createdAt={formatDateWithOrdinal(collection.shootDate)}
              coverImageUrl={collection.coverPhotoUrl}
            />
          </Link>
        </ViewTransition>
      ))}
    </div>
  );
};

export { CollectionsGrid };
