import { Spinner } from '@shotly/ui/components/spinner';
import { cn } from '@shotly/ui/lib/utils';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

type ImageDisplayProps = {
  isLoading: boolean;
  imageUrl?: string;
  alt: string;
  maxSizeMb?: number;
  allowedExtensions?: string[];
};

function ImageDisplay(props: ImageDisplayProps) {
  const { imageUrl, alt, isLoading, maxSizeMb, allowedExtensions } = props;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  const getMainNode = () => {
    if (isLoading) {
      return (
        <Spinner
          size="md"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      );
    }

    if (imageUrl) {
      return (
        <>
          {!isImageLoaded && (
            <Spinner
              size="md"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
          <Image
            fill
            key={imageUrl}
            src={imageUrl}
            alt={alt}
            className={cn(
              'object-cover transition-opacity duration-300',
              isImageLoaded ? 'opacity-100' : 'opacity-0',
            )}
            onLoad={handleImageLoaded}
          />
        </>
      );
    }

    return (
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
        <ImageIcon className="opacity-50 size-12 " aria-hidden="true" />
        <p className="text-xs text-muted-foreground">
          {allowedExtensions?.join(', ')} (Max {maxSizeMb} MB)
        </p>
      </div>
    );
  };

  return (
    <div className="relative h-full w-ful bg-muted text-muted-foreground">
      {getMainNode()}
    </div>
  );
}

export default ImageDisplay;
