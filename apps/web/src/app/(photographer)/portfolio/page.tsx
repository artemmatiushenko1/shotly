import { MOCK_COLLECTIONS } from './data';
import MainHeader from '@/components/main-header';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';
import { CollectionsGrid } from './use-cases/see-collections/collections-grid';
import { PlusIcon } from 'lucide-react';
import { Button } from '@shotly/ui/components/button';
import categoriesRepository from '@/repositories/categories.repository';
import collectionsRepository from '@/repositories/collections.repository';
import { getUser } from '@/lib/auth/get-user';
import { getTranslations } from 'next-intl/server';

async function Portfolio() {
  const user = await getUser();
  const t = await getTranslations('portfolio');

  const categories = await categoriesRepository.getCategories();
  const collections = await collectionsRepository.getAllCollections(user.id);

  return (
    <div className="h-full flex flex-col">
      <MainHeader
        title={t('title')}
        caption={t('caption')}
        extra={
          collections.length > 0 && (
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
      <div className="animate-in fade-in duration-300">
        <CollectionsGrid collections={[...MOCK_COLLECTIONS, ...collections]} />
      </div>
    </div>
  );
}

export default Portfolio;
