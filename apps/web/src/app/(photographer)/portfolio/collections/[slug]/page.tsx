import { Badge } from '@shotly/ui/components/badge';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
import {
  CalendarIcon,
  ChevronLeft,
  EllipsisIcon,
  Globe,
  ImagesIcon,
  Lock,
  MapPinIcon,
  TagIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

async function CollectionDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const isPublic = false;

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 space-y-6">
        <div className="w-full h-60 relative">
          <Image
            className="w-full h-full object-cover rounded-md mt-2 border"
            src="/auth-banner-2.jpg"
            width={400}
            height={200}
            alt="Cover image of the collection"
          />
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ size: 'icon', variant: 'outline' }),
              'size-7 absolute left-5 top-5 rounded-full',
            )}
          >
            <ChevronLeft />
          </Link>
          <Button
            size="icon"
            variant="outline"
            className={cn('size-7 absolute right-5 top-5 rounded-full')}
          >
            <EllipsisIcon />
          </Button>
        </div>
        <div className="flex justify-between items-start px-3">
          <div>
            <h3 className=" font-bold text-2xl mb-1">Summer Travel 2023</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Photos from our European journey through Italy and France
            </p>
            <div className="flex space-x-4 text-muted-foreground mb-3">
              <p className="flex space-x-2 text-xs mt-2">
                <ImagesIcon className="size-4" /> <span>{10} assets</span>
              </p>
              <p className="flex space-x-2 text-xs mt-2">
                <MapPinIcon className="size-4" /> <span>Kyiv, Ukraine</span>
              </p>
              <p className="flex space-x-2 text-xs mt-2">
                <CalendarIcon className="size-4" /> <span>Aug 15, 2023</span>
              </p>
              <p className="flex space-x-2 text-xs mt-2">
                <TagIcon className="size-4" /> <span>Landspace</span>
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <Badge
              variant="outline"
              className="text-sm rounded-full px-3 py-1 border"
            >
              <span
                className={cn(
                  'size-1 rounded-full',
                  isPublic ? 'bg-green-400' : 'bg-destructive',
                )}
              >
                &nbsp;
              </span>
              {isPublic ? (
                <>
                  <Globe /> Public
                </>
              ) : (
                <>
                  <Lock /> Private
                </>
              )}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionDetails;
