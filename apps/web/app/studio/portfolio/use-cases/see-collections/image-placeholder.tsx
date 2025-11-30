import { cn } from '@shotly/ui/lib/utils';
import { CameraIcon } from 'lucide-react';

type ImagePlaceholderProps = {
  className?: string;
  alt?: string;
};

export function ImagePlaceholder({
  className,
  alt = 'No image available',
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center bg-muted/70 overflow-hidden',
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <CameraIcon className="stroke-muted-foreground/50 size-9" />
    </div>
  );
}
