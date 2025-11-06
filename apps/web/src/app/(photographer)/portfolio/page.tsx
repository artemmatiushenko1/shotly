import { cardsData } from './data';
import MainHeader from '@/components/main-header';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';
import { CollectionsGrid } from './use-cases/see-collections/collections-grid';
import { PlusIcon } from 'lucide-react';
import { Button } from '@shotly/ui/components/button';
import categoriesRepository from '@/repositories/categories.repository';

async function Portfolio() {
  const categories = await categoriesRepository.getCategories();

  return (
    <div className="h-full flex flex-col">
      <MainHeader
        title="Portfolio"
        caption="Organize your photography work into collections"
        extra={
          cardsData.length > 0 && (
            <div className="ml-auto">
              <CreateCollectionDialog categories={categories}>
                <Button>
                  <PlusIcon /> Collection
                </Button>
              </CreateCollectionDialog>
            </div>
          )
        }
      />
      <CollectionsGrid collections={cardsData} />
    </div>
  );
}

export default Portfolio;
