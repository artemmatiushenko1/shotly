'use client';

import { PhotoCard } from './photo-card';
import UploadPhotosDialog from '../upload-photos/upload-photos-dialog';
import { Empty } from '../../empty';

type PhotosGridProps = {
  collectionId: string;
  photographerId: string;
  photos: {
    id: string;
    size: string;
    thumbnail: string;
    filename: string;
  }[];
};

const PhotosGrid = ({
  collectionId,
  photographerId,
  photos,
}: PhotosGridProps) => {
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
            size={photo.size}
            thumbnail={photo.thumbnail}
            filename={photo.filename}
          />
        ))}
      </div>
    </div>
  );
};

export { PhotosGrid };
