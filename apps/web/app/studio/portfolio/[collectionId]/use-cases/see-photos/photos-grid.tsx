'use client';

import { useTranslations } from 'next-intl';

import { Photo } from '@/entities/models/photos';

import { Empty } from '../../empty';
import { formatBytes } from '../../utils';
import { UploadPhotosCard } from '../upload-photos/upload-photos-card';
import UploadPhotosDialog from '../upload-photos/upload-photos-dialog';
import { PhotoCard } from './photo-card';

type PhotosGridProps = {
  collectionId: string;
  coverPhotoId: string | null;
  photographerId: string;
  photos: Photo[];
};

const PhotosGrid = (props: PhotosGridProps) => {
  const { collectionId, photographerId, photos, coverPhotoId } = props;

  const t = useTranslations();

  if (photos.length === 0) {
    return (
      <div className="h-full relative">
        <Empty
          className="absolute inset-0 flex items-center justify-center"
          collectionId={collectionId}
          photographerId={photographerId}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <UploadPhotosDialog
          collectionId={collectionId}
          photographerId={photographerId}
        >
          <UploadPhotosCard />
        </UploadPhotosDialog>
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            id={photo.id}
            size={formatBytes(photo.sizeInBytes, t)}
            isCoverPhoto={photo.id === coverPhotoId}
            url={photo.url}
            collectionId={collectionId}
            filename={photo.originalFilename}
          />
        ))}
      </div>
    </div>
  );
};

export { PhotosGrid };
