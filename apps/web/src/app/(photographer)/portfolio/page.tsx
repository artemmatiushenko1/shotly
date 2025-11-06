import { cardsData } from './data';
import MainHeader from '@/components/main-header';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';
import { CollectionsGrid } from './use-cases/see-collections/collections-grid';

function Portfolio() {
  return (
    <div className="h-full flex flex-col">
      <MainHeader
        title="Portfolio"
        caption="Organize your photography work into collections"
        extra={
          cardsData.length > 0 && (
            <div className="ml-auto">
              <CreateCollectionDialog />
            </div>
          )
        }
      />
      <div className="p-2 pt-4">
        <CollectionsGrid collections={cardsData} />
      </div>
    </div>
  );
}

export default Portfolio;
