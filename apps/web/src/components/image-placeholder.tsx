import { ImageIcon } from 'lucide-react';
import React from 'react';
import { cn } from '@shotly/ui/lib/utils';

type ImagePlaceholderProps = {
  className?: string;
  children?: React.ReactNode;
  alt?: string;
};

function ImagePlaceholder(props: ImagePlaceholderProps) {
  const { className, children, alt = 'No image available' } = props;

  return (
    <div
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-muted text-muted-foreground',
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <ImageIcon className="opacity-50 size-12" aria-hidden="true" />
      {children}
    </div>
  );
}

export default ImagePlaceholder;
