import { Button } from '@shotly/ui/components/button';
import { Card } from '@shotly/ui/components/card';
import { EllipsisVerticalIcon } from 'lucide-react';
import Image from 'next/image';

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
          <Button
            variant="secondary"
            size="icon"
            className="size-8 rounded-full opacity-0 group-hover:opacity-100"
          >
            <EllipsisVerticalIcon className="size-4" />
          </Button>
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
