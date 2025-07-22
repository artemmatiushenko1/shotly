import React from 'react';
import Empty from './empty';
import { cardsData } from './data';
import MainHeader from '@/components/main-header';
import { CreateCollectionDialog } from './create-collection-dialog';
import { CollectionsGrid } from './collections-grid';

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
      <div className="p-2 pt-4">
        <CollectionsGrid collections={cardsData} />
      </div>
    </div>
  );
}

export default Portfolio;
