import { PlusIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import categoriesRepository from '@/infrastructure/repositories/categories.repository';
import collectionsRepository from '@/infrastructure/repositories/collections.repository';
import { getUser } from '@/infrastructure/services/auth/dal';

import { Button } from '@shotly/ui/components/button';
import FadeIn from '@shotly/ui/components/fade-in';

import MainHeader from '../../_components/main-header';
import Empty from './empty';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';
import { CollectionsList } from './use-cases/see-collections/collections-list';

const Portfolio = async () => {
  const t = await getTranslations('portfolio');

  const user = await getUser();

  const [collections, collectionIdToCoverPhotoUrlMap, categories] =
    await Promise.all([
      collectionsRepository.getAllCollections(user.id),
      collectionsRepository.getCollectionIdToCoverPhotoUrlMap(user.id),
      categoriesRepository.getCategories(),
    ]);

  const allCollections = [...collections];

  return (
    <div className="h-full flex flex-col">
      <MainHeader
        title={t('title')}
        caption={t('caption')}
        extra={
          allCollections.length > 0 && (
            <div className="ml-auto">
              <CreateCollectionDialog categories={categories}>
                <Button>
                  <PlusIcon /> {t('createCollection')}
                </Button>
              </CreateCollectionDialog>
            </div>
          )
        }
      />
      {allCollections.length === 0 ? (
        <FadeIn className="p-4 pt-0 absolute inset-0 flex items-center justify-center">
          <Empty categories={categories} />
        </FadeIn>
      ) : (
        <FadeIn>
          <CollectionsList
            collections={allCollections}
            categories={categories}
            collectionIdToCoverPhotoUrlMap={collectionIdToCoverPhotoUrlMap}
          />
        </FadeIn>
      )}
    </div>
  );
};

export default Portfolio;
