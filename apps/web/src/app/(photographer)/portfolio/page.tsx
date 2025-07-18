import React from 'react';
import Empty from './empty';
import { cardsData } from './data';
import AlbumCard from './album-card';

function Portfolio() {
  if (cardsData.length === 0) {
    return <Empty />;
  }

  return (
    <div className="p-2 pt-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardsData.map((card) => (
          <AlbumCard
            key={card.id}
            isPublic={card.isPublic}
            title={card.title}
            description={card.description}
            imagesCount={card.imagesCount}
            createdAt={card.createdAt}
            coverSrc={card.coverSrc}
          />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
