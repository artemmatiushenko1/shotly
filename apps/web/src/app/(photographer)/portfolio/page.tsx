import { MOCK_COLLECTIONS } from './data';
import MainHeader from '@/components/main-header';
import { CreateCollectionDialog } from './use-cases/create-collection/create-collection-dialog';
import { CollectionsGrid } from './use-cases/see-collections/collections-grid';
import { PlusIcon } from 'lucide-react';
import { Button } from '@shotly/ui/components/button';
import categoriesRepository from '@/repositories/categories.repository';
import collectionsRepository from '@/repositories/collections.repository';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { UnauthenticatedError } from '@/domain/errors/auth';

async function Portfolio() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new UnauthenticatedError('User is not authenticated!');
  }

  const categories = await categoriesRepository.getCategories();
  const collections = await collectionsRepository.getAllCollections(
    session.user.id,
  );

  return (
    <div className="h-full flex flex-col">
      <MainHeader
        title="Portfolio"
        caption="Organize your photography work into collections"
        extra={
          collections.length > 0 && (
            <div className="ml-auto">
              <CreateCollectionDialog categories={categories}>
                <Button>
                  <PlusIcon /> Collection
                </Button>
              </CreateCollectionDialog>
            </div>
          )
        }
      />
      <CollectionsGrid collections={[...MOCK_COLLECTIONS, ...collections]} />
    </div>
  );
}

export default Portfolio;
