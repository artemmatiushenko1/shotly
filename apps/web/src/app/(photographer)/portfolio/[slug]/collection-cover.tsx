import ImagePlaceholder from '@/components/image-placeholder';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
import { ChevronLeft, EllipsisIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CollectionCoverProps = {
  coverImageUrl?: string | null;
};

const CollectionCover = (props: CollectionCoverProps) => {
  const { coverImageUrl } = props;

  return (
    <div className="w-full h-60 relative">
      {coverImageUrl ? (
        <Image
          className="w-full h-full object-cover rounded-md mt-2 border"
          src={coverImageUrl}
          width={400}
          height={200}
          alt="Cover image of the collection"
        />
      ) : (
        <ImagePlaceholder />
      )}
      <Link
        href="/portfolio"
        className={cn(
          buttonVariants({ size: 'icon', variant: 'outline' }),
          'size-8 absolute left-5 top-5 rounded-full',
        )}
      >
        <ChevronLeft />
      </Link>
      <Button
        size="icon"
        variant="outline"
        className={cn('size-8 absolute right-5 top-5 rounded-full')}
      >
        <EllipsisIcon />
      </Button>
    </div>
  );
};

export { CollectionCover };
