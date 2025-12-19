'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Collection } from '@/entities/models/collection';
import { VisibilityStatus } from '@/entities/models/common';

import { formatDate } from '@shotly/ui/lib/date';

import CollectionCard from './collection-card';

type CollectionsGridProps = {
  collections: Collection[];
};

const CollectionsGrid = ({ collections }: CollectionsGridProps) => {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 pt-4">
      {collections.map((collection) => (
        <Link key={collection.id} href={`/studio/portfolio/${collection.id}`}>
          <CollectionCard
            title={collection.name}
            imagesCount={collection.photosCount}
            coverImageUrl={collection.coverPhotoUrl}
            description={collection.description ?? ''}
            isPublic={collection.visibilityStatus === VisibilityStatus.PUBLIC}
            createdAt={formatDate(collection.shootDate, locale)}
          />
        </Link>
      ))}
    </div>
  );
};

export { CollectionsGrid };
