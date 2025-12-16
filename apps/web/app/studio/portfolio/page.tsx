import { PlusIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getLocale } from '@/_i18n/locale';
import { getAllCategoriesUseCase } from '@/application/use-cases/categories';
import { getPhotographerCollectionsUseCase } from '@/application/use-cases/portfolio';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';

import { Button } from '@shotly/ui/components/button';
import FadeIn from '@shotly/ui/components/fade-in';

import MainHeader from '../../_components/main-header';
import Empty from './empty';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';
import { CollectionsList } from './use-cases/see-collections/collections-list';

const Portfolio = async () => {
  const t = await getTranslations('portfolio');

  const locale = await getLocale();
  const user = await getAuthenticatedUserOrRedirect();

  const [collections, categories] = await Promise.all([
    getPhotographerCollectionsUseCase(user.id),
    getAllCategoriesUseCase(locale),
  ]);

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
      {collections.length === 0 ? (
        <FadeIn className="p-4 pt-0 absolute inset-0 flex items-center justify-center">
          <Empty categories={categories} />
        </FadeIn>
      ) : (
        <FadeIn>
          <CollectionsList collections={collections} categories={categories} />
        </FadeIn>
      )}
    </div>
  );
};

export default Portfolio;
