'use client';

import { CalendarCheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { VisibilityStatus } from '@/entities/models/common';

import { Button } from '@shotly/ui/components/button';

import ServiceCard from '../../../studio/services/use-cases/see-services/service-card';
import BookServiceDialog from '../book-service/book-service-dialog';

function SeeServices() {
  const t = useTranslations('photographerProfile.seeServices');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
      <ServiceCard
        isPublicView
        categoryName="Тварини"
        service={{
          id: '1',
          photographerId: '1',
          name: 'Зйомка собак',
          coverImageUrl:
            'https://as2.ftcdn.net/v2/jpg/15/57/02/55/1000_F_1557025506_MGNPh6Jz8traDTXRLwrGpwHAgUJO8ih4.jpg',
          price: 1500,
          currency: 'UAH',
          deliveryTimeInDays: 10,
          visibilityStatus: VisibilityStatus.PUBLIC,
          features: ['100 фото', '10 друкованих копій'],
          categoryId: '1',
          archivedAt: null,
        }}
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
        categoryName="Їжа"
        service={{
          id: '1',
          photographerId: '1',
          name: 'Зйомка меню для ресторану',
          coverImageUrl:
            'https://as1.ftcdn.net/v2/jpg/04/48/56/18/1000_F_448561871_3CdRcEoYXsx6RCNsR6nJVKB5KJ70A9hx.jpg',
          price: 2000,
          currency: 'UAH',
          deliveryTimeInDays: 25,
          visibilityStatus: VisibilityStatus.PUBLIC,
          features: ['Фото-дизайн меню', '100 фотографій'],
          categoryId: '1',
          archivedAt: null,
        }}
        extraActions={
          <Button className="mr-4 mt-4 rounded-full">
            <CalendarCheckIcon />
            {t('bookButton')}
          </Button>
        }
      />
      <ServiceCard
        isPublicView
        categoryName="Індивідуальна фотосесія"
        service={{
          id: '1',
          photographerId: '1',
          name: 'Індивідуальна фотосесія',
          coverImageUrl:
            'https://firebasestorage.googleapis.com/v0/b/personal-website-4afb5.appspot.com/o/artworks%2FIMG_3102-min.jpg?alt=media&token=56790863-45c0-4d5a-89b1-725c3d72536f',
          price: 3000,
          currency: 'UAH',
          deliveryTimeInDays: 30,
          visibilityStatus: VisibilityStatus.PUBLIC,
          features: ['10 портретів з ретушюванням'],
          categoryId: '1',
          archivedAt: null,
        }}
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
