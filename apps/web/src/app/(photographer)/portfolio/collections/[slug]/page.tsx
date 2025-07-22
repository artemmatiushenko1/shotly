import { Badge } from '@shotly/ui/components/badge';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { Card } from '@shotly/ui/components/card';
import { cn } from '@shotly/ui/lib/utils';
import {
  CalendarIcon,
  ChevronLeft,
  EllipsisIcon,
  EllipsisVerticalIcon,
  Globe,
  ImagesIcon,
  Lock,
  MapPinIcon,
  TagIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Empty } from './empty';

const photos = [
  {
    id: '1',
    filename: 'ceremony_001.jpg',
    url: '/auth-banner.jpg',
    thumbnail: '/auth-banner.jpg',
    uploadDate: '2024-01-15',
    size: '2.4 MB',
    dimensions: '4000x3000',
    isFavorite: true,
    isSelected: false,
    tags: ['ceremony', 'bride', 'groom'],
  },
  {
    id: '2',
    filename: 'reception_045.jpg',
    url: '/auth-banner.jpg',
    thumbnail: '/auth-banner.jpg',
    uploadDate: '2024-01-15',
    size: '3.1 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['reception', 'dancing', 'celebration'],
  },
  {
    id: '3',
    filename: 'portraits_012.jpg',
    url: '/auth-banner-2.jpg',
    thumbnail: '/auth-banner-2.jpg',
    uploadDate: '2024-01-15',
    size: '2.8 MB',
    dimensions: '3000x4000',
    isFavorite: true,
    isSelected: false,
    tags: ['portraits', 'couple', 'romantic'],
  },
  {
    id: '4',
    filename: 'details_008.jpg',
    url: '/auth-banner-3.jpg',
    thumbnail: '/auth-banner-3.jpg',
    uploadDate: '2024-01-15',
    size: '1.9 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['details', 'rings', 'flowers'],
  },
  {
    id: '5',
    filename: 'family_023.jpg',
    url: '/auth-banner-3.jpg',
    thumbnail: '/auth-banner-3.jpg',
    uploadDate: '2024-01-15',
    size: '2.6 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['family', 'group', 'formal'],
  },
  {
    id: '6',
    filename: 'candid_067.jpg',
    url: '/auth-banner-4.jpg',
    thumbnail: '/auth-banner-4.jpg',
    uploadDate: '2024-01-15',
    size: '2.2 MB',
    dimensions: '4000x3000',
    isFavorite: false,
    isSelected: false,
    tags: ['candid', 'laughter', 'guests'],
  },
];

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
            src="/auth-banner.jpg"
            width={400}
            height={200}
            alt="Cover image of the collection"
          />
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
      {photos.length === 0 ? (
        <Empty />
      ) : (
        <div className="max-w-7xl px-4 sm:px-6 lg:px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {/* TODO: display upload area as first element */}
            {photos.map((photo) => (
              <Card
                key={photo.id}
                className="overflow-hidden shadow-none group cursor-pointer hover:shadow-lg transition-shadow p-0"
              >
                <div className="relative">
                  <Image
                    src={photo.thumbnail || '/placeholder.svg'}
                    alt={photo.filename}
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
                    <p className="text-white text-sm font-medium truncate">
                      {photo.filename}
                    </p>
                    <p className="text-white/80 text-xs">{photo.size}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionDetails;
