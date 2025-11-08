import { Empty } from './empty';
import { PhotosGrid } from './photos-grid';
import { CollectionCover } from './collection-cover';
import { CollectionMetadata } from './collection-metadata';
import collectionsRepository from '@/repositories/collections.repository';
import categoriesRepository from '@/repositories/categories.repository';

const photos = [
  {
    id: '1',
    filename: 'ceremony_001.jpg',
    url: '/auth-banner.jpg',
    thumbnail: '/auth-banner.jpg',
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    dimensions: '4000x3000',
    isFavorite: true,
    isSelected: false,
    tags: ['ceremony', 'bride', 'groom'],
  },
  {
    id: '2',
    filename: 'reception_045.jpg',
    url: '/auth-banner.jpg',
    thumbnail: '/auth-banner.jpg',
    uploadDate: '2024-01-15',
    size: '3.1 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['reception', 'dancing', 'celebration'],
  },
  {
    id: '3',
    filename: 'portraits_012.jpg',
    url: '/auth-banner-2.jpg',
    thumbnail: '/auth-banner-2.jpg',
    uploadDate: '2024-01-15',
    size: '2.8 MB',
    dimensions: '3000x4000',
    isFavorite: true,
    isSelected: false,
    tags: ['portraits', 'couple', 'romantic'],
  },
  {
    id: '4',
    filename: 'details_008.jpg',
    url: '/auth-banner-3.jpg',
    thumbnail: '/auth-banner-3.jpg',
    uploadDate: '2024-01-15',
    size: '1.9 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['details', 'rings', 'flowers'],
  },
  {
    id: '5',
    filename: 'family_023.jpg',
    url: '/auth-banner-3.jpg',
    thumbnail: '/auth-banner-3.jpg',
    uploadDate: '2024-01-15',
    size: '2.6 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['family', 'group', 'formal'],
  },
  {
    id: '6',
    filename: 'candid_067.jpg',
    url: '/auth-banner-4.jpg',
    thumbnail: '/auth-banner-4.jpg',
    uploadDate: '2024-01-15',
    size: '2.2 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['candid', 'laughter', 'guests'],
  },
];

type CollectionDetailsProps = {
  params: Promise<{ slug: string }>;
};

async function CollectionDetails({ params }: CollectionDetailsProps) {
  const { slug } = await params;

  const collection = await collectionsRepository.getCollectionById(slug);
  const category = await categoriesRepository.getCategoryById(
    collection.categoryId,
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 pt-5 space-y-6">
        <CollectionCover />
        <CollectionMetadata
          name={collection.name}
          description={collection.description ?? ''}
          photosCount={10} // TODO: get photos count from photos repository
          shootDate={collection.shootDate}
          categoryName={category.name}
          status={collection.visibilityStatus}
        />
      </div>
      {photos.length === 0 ? <Empty /> : <PhotosGrid photos={photos} />}
    </div>
  );
}

export default CollectionDetails;
