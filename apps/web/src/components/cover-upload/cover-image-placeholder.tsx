import type { ReactNode } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@shotly/ui/lib/utils';

type CoverImagePlaceholderProps = {
  className?: string;
  children?: ReactNode;
};

const CoverImagePlaceholder = (props: CoverImagePlaceholderProps) => {
  const { className, children } = props;

  return (
    <div
      className={cn(
        'relative flex h-48 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-muted-foreground/40 bg-muted text-muted-foreground',
        className,
      )}
    >
      <ImageIcon className="h-12 w-12 opacity-70" aria-hidden="true" />
      {children}
    </div>
  );
};

export { CoverImagePlaceholder };
