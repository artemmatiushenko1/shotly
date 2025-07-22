import Link from 'next/link';
import CollectionCard from './collection-card';

type CollectionsGridProps = {
  collections: {
    isPublic: boolean;
    title: string;
    description: string;
    imagesCount: number;
    createdAt: string;
    coverSrc: string;
    id: string;
  }[];
};
const CollectionsGrid = ({ collections }: CollectionsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {collections.map((collection) => (
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
  );
};

export { CollectionsGrid };
