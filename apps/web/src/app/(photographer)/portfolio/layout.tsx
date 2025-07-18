import MainHeader from '@/components/main-header';
import { Button } from '@shotly/ui/components/button';
import { Plus } from 'lucide-react';
import React from 'react';
import { cardsData } from './data';

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
          <Button className="ml-auto">
            <Plus />
            New Collection
          </Button>
        )}
      </MainHeader>
      {children}
    </div>
  );
}

export default PortfolioLayout;
