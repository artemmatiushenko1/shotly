'use client';

import { PhotoCard } from './photo-card';
import UploadPhotosDialog from '../upload-photos/upload-photos-dialog';
import { Empty } from '../../empty';
import { Photo } from '@/domain/photos';
import { formatBytes } from '../../utils';
import { useTranslations } from 'next-intl';

type PhotosGridProps = {
  collectionId: string;
  photographerId: string;
  photos: Photo[];
};

const PhotosGrid = ({
  collectionId,
  photographerId,
  photos,
}: PhotosGridProps) => {
  const t = useTranslations();

  if (photos.length === 0) {
    return <Empty />;
  }

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <UploadPhotosDialog
          collectionId={collectionId}
          photographerId={photographerId}
        />
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            size={formatBytes(photo.sizeInBytes, t)}
            imageUrl={photo.url}
            collectionId={collectionId}
            filename={photo.originalFilename}
          />
        ))}
      </div>
    </div>
  );
};

export { PhotosGrid };
