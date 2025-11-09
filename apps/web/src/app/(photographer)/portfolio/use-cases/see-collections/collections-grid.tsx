'use client';

import Link from 'next/link';
import CollectionCard from './collection-card';
import Empty from './empty';
import { Collection } from '@/domain/collection';
import { VisibilityStatus } from '@/domain/common';
import { formatDateWithOrdinal } from '@/utils/date-formatting';

type CollectionsGridProps = {
  collections: Collection[];
};

const CollectionsGrid = ({ collections }: CollectionsGridProps) => {
  if (collections.length === 0) {
    return <Empty />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-3 pt-4">
      {collections.map((collection) => (
        <Link key={collection.id} href={`/portfolio/${collection.id}`}>
          <CollectionCard
            isPublic={collection.visibilityStatus === VisibilityStatus.PUBLIC}
            title={collection.name}
            description={collection.description ?? ''}
            imagesCount={0} // TODO: create method to get images summary per collection map
            createdAt={formatDateWithOrdinal(collection.shootDate)}
            coverSrc={collection.coverImageUrl ?? ''}
          />
        </Link>
      ))}
    </div>
  );
};

export { CollectionsGrid };
