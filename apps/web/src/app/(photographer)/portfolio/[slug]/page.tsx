import { Empty } from './empty';
import { PhotosGrid } from './photos-grid';
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

type CollectionDetailsProps = {
  params: Promise<{ slug: string }>;
};

async function CollectionDetails({ params }: CollectionDetailsProps) {
  const { slug } = await params;
  const t = await getTranslations('portfolio.collectionDetails');

  const collection = await collectionsRepository.getCollectionById(slug);
  const categories = await categoriesRepository.getCategories();

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
      {photos.length === 0 ? <Empty /> : <PhotosGrid photos={photos} />}
    </div>
  );
}

export default CollectionDetails;
