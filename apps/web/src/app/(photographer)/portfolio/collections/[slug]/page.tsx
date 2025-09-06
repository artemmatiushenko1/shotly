import { Empty } from './empty';
import { PhotosGrid } from './photos-grid';
import { CollectionCover } from './collection-cover';
import { CollectionMetadata } from './collection-metadata';

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

async function CollectionDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 space-y-6">
        <CollectionCover />
        <CollectionMetadata isPublic />
      </div>
      {photos.length === 0 ? <Empty /> : <PhotosGrid photos={photos} />}
      {slug}
    </div>
  );
}

export default CollectionDetails;
