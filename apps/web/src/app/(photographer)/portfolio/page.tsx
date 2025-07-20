import React from 'react';
import Empty from './empty';
import { cardsData } from './data';
import CollectionCard from './collection-card';
import Link from 'next/link';
import MainHeader from '@/components/main-header';
import { CreateCollectionDialog } from './create-collection-dialog';

function Portfolio() {
  if (cardsData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Empty />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <MainHeader>
        <div>
          <h2 className="font-medium">Portfolio</h2>
          <div className="text-muted-foreground text-xs">
            Organize your photography work into collections
          </div>
        </div>
        {cardsData.length > 0 && (
          <div className="ml-auto">
            <CreateCollectionDialog />
          </div>
        )}
      </MainHeader>
      <div className="p-2 pt-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardsData.map((collection) => (
            <Link
              key={collection.id}
              href={`/portfolio/collections/${collection.id}`}
            >
              <CollectionCard
                isPublic={collection.isPublic}
                title={collection.title}
                description={collection.description}
                imagesCount={collection.imagesCount}
                createdAt={collection.createdAt}
                coverSrc={collection.coverSrc}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
