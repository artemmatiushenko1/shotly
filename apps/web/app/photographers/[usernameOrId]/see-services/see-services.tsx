'use client';

import { CalendarCheckIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Service } from '@/entities/models/service';

import { Button } from '@shotly/ui/components/button';

import ServiceCard from '../../../studio/services/use-cases/see-services/service-card';
import BookServiceDialog from '../book-service/book-service-dialog';

type SeeServicesProps = {
  services: Service[];
};

function SeeServices({ services }: SeeServicesProps) {
  const t = useTranslations('photographerProfile.seeServices');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          isPublicView
          categoryName={service.category.name}
          service={service}
          extraActions={
            <BookServiceDialog>
              <Button className="mr-4 mt-4 rounded-full">
                <CalendarCheckIcon />
                {t('bookButton')}
              </Button>
            </BookServiceDialog>
          }
        />
      ))}
    </div>
  );
}

export default SeeServices;
