import React from 'react';
import CollectionCard from './collection-card';

function SeePorfolio() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CollectionCard
          id="1"
          coverPhotoUrl="https://placehold.co/600x400"
          title="Collection 1"
          description="Description 1"
          photosCount={10}
          updatedAt={new Date()}
          category="Wedding"
        />
        <CollectionCard
          id="2"
          coverPhotoUrl="https://placehold.co/600x400"
          title="Collection 2"
          description="Description 2"
          photosCount={20}
          updatedAt={new Date()}
          category="Family"
        />
        <CollectionCard
          id="3"
          coverPhotoUrl="https://placehold.co/600x400"
          title="Collection 3"
          description="Description 3"
          photosCount={30}
          updatedAt={new Date()}
          category="Portrait"
        />
        <CollectionCard
          id="3"
          coverPhotoUrl="https://placehold.co/600x400"
          title="Collection 3"
          description="Description 3"
          photosCount={30}
          updatedAt={new Date()}
          category="Portrait"
        />
        <CollectionCard
          id="3"
          coverPhotoUrl="https://placehold.co/600x400"
          title="Collection 3"
          description="Description 3"
          photosCount={30}
          updatedAt={new Date()}
          category="Portrait"
        />
        <CollectionCard
          id="3"
          coverPhotoUrl="https://placehold.co/600x400"
          title="Collection 3"
          description="Description 3"
          photosCount={30}
          updatedAt={new Date()}
          category="Portrait"
        />
      </div>
    </div>
  );
}

export default SeePorfolio;
