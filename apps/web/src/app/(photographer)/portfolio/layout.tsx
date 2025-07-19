import MainHeader from '@/components/main-header';
import React from 'react';
import { cardsData } from './data';
import { CreateCollectionDialog } from './create-collection-dialog';

function PortfolioLayout({ children }: { children: React.ReactNode }) {
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
      {children}
    </div>
  );
}

export default PortfolioLayout;
