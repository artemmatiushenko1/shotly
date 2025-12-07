import { StarIcon } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@shotly/ui/components/card';

import PhotoContextMenu from './photo-context-menu';

type PhotoCardProps = {
  id: string;
  size: string;
  isCoverPhoto: boolean;
  collectionId: string;
  url: string;
  filename: string;
};

const PhotoCard = (props: PhotoCardProps) => {
  const { id, url, filename, size, collectionId, isCoverPhoto } = props;

  return (
    <Card className="overflow-hidden shadow-none group cursor-pointer hover:shadow-lg transition-shadow p-0">
      <div className="relative">
        <Image
          src={url}
          alt={filename}
          width={300}
          height={300}
          quality={50}
          className="w-full h-48 object-cover"
        />
        {isCoverPhoto && (
          <div className="absolute top-4 left-4">
            <StarIcon className="size-4 text-white" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <PhotoContextMenu
            collectionId={collectionId}
            photoId={id}
            isCoverPhoto={isCoverPhoto}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-sm font-medium truncate">{filename}</p>
          <p className="text-white/80 text-xs">{size}</p>
        </div>
      </div>
    </Card>
  );
};

export { PhotoCard };
