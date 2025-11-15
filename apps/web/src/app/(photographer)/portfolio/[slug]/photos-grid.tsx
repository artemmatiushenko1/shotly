'use client';

import { PhotoCard } from './photo-card';
import UploadPhotosDialog from './use-cases/upload-photos/upload-photos-dialog';

type PhotosGridProps = {
  photos: {
    id: string;
    size: string;
    thumbnail: string;
    filename: string;
  }[];
};

const PhotosGrid = ({ photos }: PhotosGridProps) => {
  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <UploadPhotosDialog />
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
