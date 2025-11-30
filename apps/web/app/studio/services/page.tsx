import MainHeader from '../../_components/main-header';
import { Button } from '@shotly/ui/components/button';
import { PlusIcon } from 'lucide-react';
import CreateServiceDialog from './use-cases/create-service/create-service-dialog';
import ServicesList from './use-cases/see-services/services-list';
import categoriesRepository from '@/repositories/categories.repository';
import { getUser } from '@/lib/auth/dal';
import { getTranslations } from 'next-intl/server';
import FadeIn from '@shotly/ui/components/fade-in';
import { getPhotographerServicesUseCase } from '@/use-cases/services/get-photographer-services.use-case';

async function Services() {
  const user = await getUser();
  const t = await getTranslations('services');

  const categories = await categoriesRepository.getCategories();
  const services = await getPhotographerServicesUseCase(user.id);

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
