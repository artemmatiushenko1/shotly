import { Card } from '@shotly/ui/components/card';
import Image from 'next/image';
import PhotoContextMenu from './photo-context-menu';

type PhotoCardProps = {
  thumbnail: string;
  filename: string;
  size: string;
};

const PhotoCard = ({ thumbnail, filename, size }: PhotoCardProps) => {
  return (
    <Card className="overflow-hidden shadow-none group cursor-pointer hover:shadow-lg transition-shadow p-0">
      <div className="relative">
        <Image
          src={thumbnail}
          alt={filename}
          width={300}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <PhotoContextMenu />
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
