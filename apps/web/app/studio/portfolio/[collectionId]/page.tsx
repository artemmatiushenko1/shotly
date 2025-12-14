import { ChevronLeftIcon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { getAllCategoriesUseCase } from '@/application/use-cases/categories';
import {
  getCollectionByIdUseCase,
  getCollectionPhotosUseCase,
} from '@/application/use-cases/portfolio';
import { getUser } from '@/infrastructure/services/auth/dal';

import { Button, buttonVariants } from '@shotly/ui/components/button';
import FadeIn from '@shotly/ui/components/fade-in';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';
import { cn } from '@shotly/ui/lib/utils';

import { CollectionCover } from './collection-cover';
import { CollectionMetadata } from './collection-metadata';
import { PhotosUploadProvider } from './photos-upload.context';
import { PhotosGrid } from './use-cases/see-photos/photos-grid';
import CollectionSettingsDialog from './use-cases/update-collection-settings/collection-settings-dialog';
import UploadStatusWidget from './use-cases/upload-photos/upload-status-widget';

type CollectionDetailsProps = {
  params: Promise<{ collectionId: string }>;
};

async function CollectionDetails({ params }: CollectionDetailsProps) {
  const { collectionId } = await params;

  const user = await getUser();

  const t = await getTranslations('portfolio.collectionDetails');

  const [collection, photos, categories] = await Promise.all([
    getCollectionByIdUseCase(user.id, collectionId),
    getCollectionPhotosUseCase(user.id, collectionId),
    getAllCategoriesUseCase(),
  ]);

  const category = categories.find(
    (category) => category.id === collection.categoryId,
  );
  const coverPhoto = photos.find(
    (photo) => photo.id === collection.coverPhotoId,
  );

  if (!category) {
    throw new Error(t('errors.categoryNotFound'));
  }

  return (
    <FadeIn className="h-full flex flex-col">
      <div className="p-3 pt-5 space-y-6">
        <CollectionCover coverImageUrl={coverPhoto?.url}>
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/studio/portfolio"
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
          photosCount={collection.photosCount}
          shootDate={collection.shootDate}
          categoryName={category.name}
          status={collection.visibilityStatus}
        />
      </div>
      <PhotosUploadProvider
        userId={user.id}
        collectionId={collection.id}
        existingPhotos={photos}
      >
        <PhotosGrid
          coverPhotoId={coverPhoto?.id ?? null}
          collectionId={collection.id}
          photographerId={user.id}
          photos={photos}
        />
        <div className="fixed bottom-4 right-4 z-10">
          <UploadStatusWidget />
        </div>
      </PhotosUploadProvider>
    </FadeIn>
  );
}

export default CollectionDetails;
