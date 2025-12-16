import { Collection } from '@/entities/models/collection';

import CollectionCard from './collection-card';

type SeePorfolioProps = {
  collections: Collection[];
};

function SeePorfolio({ collections }: SeePorfolioProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => {
          if (!collection.coverPhotoUrl) {
            return null;
          }

          return (
            <CollectionCard
              key={collection.id}
              id={collection.id}
              coverPhotoUrl={collection.coverPhotoUrl ?? ''}
              title={collection.name}
              description={collection.description}
              photosCount={collection.photosCount}
              updatedAt={collection.updatedAt}
              category={collection.category}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SeePorfolio;
