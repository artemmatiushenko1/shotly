import { PhotosGrid } from './use-cases/see-photos/photos-grid';
import { CollectionCover } from './collection-cover';
import { CollectionMetadata } from './collection-metadata';
import collectionsRepository from '@/repositories/collections.repository';
import categoriesRepository from '@/repositories/categories.repository';
import Link from 'next/link';
import { Button, buttonVariants } from '@shotly/ui/components/button';
import { cn } from '@shotly/ui/lib/utils';
import { ChevronLeftIcon, SettingsIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';
import { getTranslations } from 'next-intl/server';
import CollectionSettingsDialog from './use-cases/update-collection-settings/collection-settings-dialog';
import { getUser } from '@/lib/auth/get-user';
import { Photo } from '@/domain/photos';

const MOCK_PHOTOS: Photo[] = [
  {
    id: '1',
    originalFilename: 'ceremony_001.jpg',
    url: '/auth-banner.jpg',
    sizeInBytes: 1000000,
    width: 4000,
    height: 3000,
    format: 'jpg',
    metadata: {
      cameraMake: 'Canon',
      cameraModel: 'EOS R5',
      lens: 'EF24-105mm f/4L IS USM',
      focalLength: '24mm',
      aperture: 'f/4',
      shutterSpeed: '1/1000s',
      iso: 100,
    },
    createdAt: new Date(),
  },
  {
    id: '2',
    originalFilename: 'reception_045.jpg',
    url: '/auth-banner-2.jpg',
    sizeInBytes: 1000000,
    width: 4000,
    height: 3000,
    format: 'jpg',
    metadata: {
      cameraMake: 'Canon',
      cameraModel: 'EOS R5',
      lens: 'EF24-105mm f/4L IS USM',
      focalLength: '24mm',
      aperture: 'f/4',
      shutterSpeed: '1/1000s',
      iso: 100,
    },
    createdAt: new Date(),
  },
  {
    id: '3',
    originalFilename: 'portraits_012.jpg',
    url: '/auth-banner-3.jpg',
    sizeInBytes: 1000000,
    width: 4000,
    height: 3000,
    format: 'jpg',
    metadata: {
      cameraMake: 'Canon',
      cameraModel: 'EOS R5',
      lens: 'EF24-105mm f/4L IS USM',
      focalLength: '24mm',
      aperture: 'f/4',
      shutterSpeed: '1/1000s',
      iso: 100,
    },
    createdAt: new Date(),
  },
  {
    id: '4',
    originalFilename: 'details_008.jpg',
    url: '/auth-banner-4.jpg',
    sizeInBytes: 1000000,
    width: 4000,
    height: 3000,
    format: 'jpg',
    metadata: {
      cameraMake: 'Canon',
      cameraModel: 'EOS R5',
      lens: 'EF24-105mm f/4L IS USM',
      focalLength: '24mm',
      aperture: 'f/4',
      shutterSpeed: '1/1000s',
      iso: 100,
    },
    createdAt: new Date(),
  },
  {
    id: '5',
    originalFilename: 'family_023.jpg',
    url: '/auth-banner-5.jpg',
    sizeInBytes: 1000000,
    width: 4000,
    height: 3000,
    format: 'jpg',
    metadata: {
      cameraMake: 'Canon',
      cameraModel: 'EOS R5',
      lens: 'EF24-105mm f/4L IS USM',
      focalLength: '24mm',
      aperture: 'f/4',
      shutterSpeed: '1/1000s',
      iso: 100,
    },
    createdAt: new Date(),
  },
  {
    id: '6',
    originalFilename: 'candid_067.jpg',
    url: '/auth-banner.jpg',
    sizeInBytes: 1000000,
    width: 4000,
    height: 3000,
    format: 'jpg',
    metadata: {
      cameraMake: 'Canon',
      cameraModel: 'EOS R5',
      lens: 'EF24-105mm f/4L IS USM',
      focalLength: '24mm',
      aperture: 'f/4',
      shutterSpeed: '1/1000s',
      iso: 100,
    },
    createdAt: new Date(),
  },
];

type CollectionDetailsProps = {
  params: Promise<{ slug: string }>;
};

async function CollectionDetails({ params }: CollectionDetailsProps) {
  const { slug: collectionId } = await params;

  const user = await getUser();

  const t = await getTranslations('portfolio.collectionDetails');

  const [collection, photos, categories] = await Promise.all([
    collectionsRepository.getCollectionById(collectionId),
    collectionsRepository.getPhotosByCollectionId(collectionId),
    categoriesRepository.getCategories(),
  ]);

  const category = categories.find(
    (category) => category.id === collection.categoryId,
  );

  if (!category) {
    throw new Error(t('errors.categoryNotFound'));
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 pt-5 space-y-6">
        <CollectionCover>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/portfolio"
                  className={cn(
                    buttonVariants({ size: 'icon', variant: 'outline' }),
                    'size-8 absolute left-5 top-5 rounded-full',
                  )}
                >
                  <ChevronLeftIcon />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{t('backToPortfolio')}</TooltipContent>
            </Tooltip>
            <Tooltip>
              <CollectionSettingsDialog
                categories={categories}
                collection={collection}
              >
                <div>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className={cn(
                        'size-8 absolute right-5 top-5 rounded-full',
                      )}
                    >
                      <SettingsIcon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{t('settingsTooltip')}</TooltipContent>
                </div>
              </CollectionSettingsDialog>
            </Tooltip>
          </div>
        </CollectionCover>
        <CollectionMetadata
          name={collection.name}
          description={collection.description ?? ''}
          photosCount={10} // TODO: get photos count from photos repository
          shootDate={collection.shootDate}
          categoryName={category.name}
          status={collection.visibilityStatus}
        />
      </div>
      <PhotosGrid
        collectionId={collection.id}
        photographerId={user.id}
        photos={[...MOCK_PHOTOS, ...photos]}
      />
    </div>
  );
}

export default CollectionDetails;
