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
import FadeIn from '@shotly/ui/components/fade-in';

type CollectionDetailsProps = {
  params: Promise<{ slug: string }>;
};

async function CollectionDetails({ params }: CollectionDetailsProps) {
  const { slug: collectionId } = await params;

  const user = await getUser();

  const t = await getTranslations('portfolio.collectionDetails');

  const [collection, photos, photoCount, categories] = await Promise.all([
    collectionsRepository.getCollectionById(collectionId),
    collectionsRepository.getPhotosByCollectionId(collectionId),
    collectionsRepository.getPhotoCountByCollectionId(collectionId),
    categoriesRepository.getCategories(),
  ]);

  const category = categories.find(
    (category) => category.id === collection.categoryId,
  );

  if (!category) {
    throw new Error(t('errors.categoryNotFound'));
  }

  return (
    <FadeIn className="h-full flex flex-col">
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
          photosCount={photoCount}
          shootDate={collection.shootDate}
          categoryName={category.name}
          status={collection.visibilityStatus}
        />
      </div>
      <PhotosGrid
        collectionId={collection.id}
        photographerId={user.id}
        photos={photos}
      />
    </FadeIn>
  );
}

export default CollectionDetails;
