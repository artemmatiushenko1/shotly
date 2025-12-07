import MainHeader from '../../_components/main-header';
import { Button } from '@shotly/ui/components/button';
import { PlusIcon } from 'lucide-react';
import CreateServiceDialog from './use-cases/manage-service/service-dialog';
import ServicesList from './use-cases/see-services/service-list';
import { getUser } from '@/lib/auth/dal';
import { getTranslations } from 'next-intl/server';
import FadeIn from '@shotly/ui/components/fade-in';
import { getPhotographerServicesUseCase } from '@/application/use-cases/services';
import { getAllCategoriesUseCase } from '@/application/use-cases/categories';

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
          <CreateServiceDialog categories={categories}>
            <Button className="ml-auto">
              <PlusIcon />
              {t('createService')}
            </Button>
          </CreateServiceDialog>
        }
      />
      <FadeIn className="p-4 pt-0">
        <ServicesList categories={categories} services={[...services]} />
      </FadeIn>
    </>
  );
}

export default Services;
