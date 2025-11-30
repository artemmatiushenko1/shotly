'use client';

import ServiceCard from '../../../studio/services/use-cases/see-services/service-card';
import { ServiceStatus } from '@/domain/service';
import { Button } from '@shotly/ui/components/button';
import { CalendarCheckIcon } from 'lucide-react';
import BookServiceDialog from '../book-service/book-service-dialog';
import { useTranslations } from 'next-intl';

function SeeServices() {
  const t = useTranslations('photographerProfile.seeServices');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
      <ServiceCard
        isPublicView
        id="1"
        coverUrl="https://as2.ftcdn.net/v2/jpg/15/57/02/55/1000_F_1557025506_MGNPh6Jz8traDTXRLwrGpwHAgUJO8ih4.jpg"
        name="Зйомка собак"
        description="Зйомка собак на вулиці або в студії з додатковим декором. У вартість входить 3 різні локації."
        price={1500}
        priceUnit="грн"
        categoryName="Тварини"
        deliveryTime="10"
        features={['100 фото', '10 друкованих копій']}
        status={ServiceStatus.PUBLIC}
        extraActions={
          <BookServiceDialog>
            <Button className="mr-4 mt-4 rounded-full">
              <CalendarCheckIcon /> {t('bookButton')}
            </Button>
          </BookServiceDialog>
        }
      />
      <ServiceCard
        isPublicView
        id="1"
        coverUrl="https://as1.ftcdn.net/v2/jpg/04/48/56/18/1000_F_448561871_3CdRcEoYXsx6RCNsR6nJVKB5KJ70A9hx.jpg"
        name="Зйомка меню для ресторану"
        description="Створюю апетитний контент, що продає. Ідеально підходить для друкованого меню, Instagram та служб доставки."
        price={2000}
        priceUnit="грн"
        categoryName="Їжа"
        deliveryTime="25"
        features={['Фото-дизайн меню', '100 фотографій']}
        status={ServiceStatus.PUBLIC}
        extraActions={
          <Button className="mr-4 mt-4 rounded-full">
            <CalendarCheckIcon />
            {t('bookButton')}
          </Button>
        }
      />
      <ServiceCard
        isPublicView
        id="1"
        coverUrl="https://firebasestorage.googleapis.com/v0/b/personal-website-4afb5.appspot.com/o/artworks%2FIMG_3102-min.jpg?alt=media&token=56790863-45c0-4d5a-89b1-725c3d72536f"
        name="Індивідуальна фотосесія"
        description="Разом обираємо локацію та стиль фотосесії. Додатково підбираємо гардероб та референси."
        price={1800}
        priceUnit="грн"
        categoryName="Портрет"
        deliveryTime="10"
        features={['10 портретів з ретушюванням']}
        status={ServiceStatus.PUBLIC}
        extraActions={
          <Button className="mr-4 mt-4 rounded-full">
            <CalendarCheckIcon />
            {t('bookButton')}
          </Button>
        }
      />
    </div>
  );
}

export default SeeServices;
