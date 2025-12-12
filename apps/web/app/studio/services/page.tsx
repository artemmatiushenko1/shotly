import { PlusIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getAllCategoriesUseCase } from '@/application/use-cases/categories';
import { getPhotographerServicesUseCase } from '@/application/use-cases/services';
import { getUser } from '@/infrastructure/services/auth/dal';

import { Button } from '@shotly/ui/components/button';
import FadeIn from '@shotly/ui/components/fade-in';

import MainHeader from '../../_components/main-header';
import Empty from './empty';
import CreateServiceDialog from './use-cases/manage-service/service-dialog';
import ServicesList from './use-cases/see-services/service-list';

async function Services() {
  const user = await getUser();

  const t = await getTranslations('services');

  const [categories, services] = await Promise.all([
    getAllCategoriesUseCase(),
    getPhotographerServicesUseCase(user.id),
  ]);

  return (
    <>
      <MainHeader
        title={t('title')}
        caption={t('caption')}
        extra={
          services.length === 0 ? null : (
            <CreateServiceDialog categories={categories}>
              <Button className="ml-auto">
                <PlusIcon />
                {t('createService')}
              </Button>
            </CreateServiceDialog>
          )
        }
      />
      {services.length === 0 ? (
        <FadeIn className="p-4 pt-0 absolute inset-0 flex items-center justify-center">
          <Empty categories={categories} />
        </FadeIn>
      ) : (
        <FadeIn className="p-4 pt-0">
          <ServicesList categories={categories} services={services} />
        </FadeIn>
      )}
    </>
  );
}

export default Services;
