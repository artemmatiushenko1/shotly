import MainHeader from '@/components/main-header';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';
import { CollectionsList } from './use-cases/see-collections/collections-list';
import { PlusIcon } from 'lucide-react';
import { Button } from '@shotly/ui/components/button';
import categoriesRepository from '@/repositories/categories.repository';
import collectionsRepository from '@/repositories/collections.repository';
import { getUser } from '@/lib/auth/dal';
import { getTranslations } from 'next-intl/server';
import FadeIn from '@shotly/ui/components/fade-in';

const Portfolio = async () => {
  const t = await getTranslations('portfolio');

  const user = await getUser();

  const [
    collections,
    collectionIdToPhotoCountMap,
    collectionIdToCoverPhotoUrlMap,
    categories,
  ] = await Promise.all([
    collectionsRepository.getAllCollections(user.id),
    // TODO: use relations instead of maps
    collectionsRepository.getCollectionIdToPhotoCountMap(user.id),
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
      <FadeIn>
        <CollectionsList
          collections={allCollections}
          categories={categories}
          collectionIdToPhotoCountMap={collectionIdToPhotoCountMap}
          collectionIdToCoverPhotoUrlMap={collectionIdToCoverPhotoUrlMap}
        />
      </FadeIn>
    </div>
  );
};

export default Portfolio;
