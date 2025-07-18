import React from 'react';
import AlbumCard from './album-card';

const cardsData = [
  {
    id: '1',
    title: 'Karra Loft',
    imagesCount: 8,
    createdAt: '19th Jun 2023',
    description: 'Canada, Vancouver',
    isPublic: true,
    coverSrc: '/auth-banner-2.jpg',
  },
  {
    id: '2',
    title: 'Karra Loft',
    imagesCount: 34,
    createdAt: '19th Jun 2023',
    description: 'Canada, Vancouver',
    isPublic: false,
    coverSrc: '/auth-banner-2.jpg',
  },
  {
    id: '3',
    title: 'Karra Loft',
    imagesCount: 4,
    createdAt: '19th Jun 2023',
    description: 'Canada, Vancouver',
    isPublic: true,
    coverSrc: '/auth-banner-2.jpg',
  },
  {
    id: '4',
    title: 'Karra Loft',
    imagesCount: 24,
    createdAt: '19th Jun 2023',
    description: 'Canada, Vancouver',
    isPublic: false,
    coverSrc: '/auth-banner-2.jpg',
  },
];

function Portfolio() {
  return (
    <div className="p-2 pt-4">
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

      {/* <Empty /> */}
    </div>
  );
}

export default Portfolio;
