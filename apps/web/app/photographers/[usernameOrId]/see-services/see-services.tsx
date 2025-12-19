'use client';

import { useTranslations } from 'next-intl';

import { Service } from '@/entities/models/service';
import { UserProfile } from '@/entities/models/user';
import { AuthenticatedUser } from '@/infrastructure/services/auth/dal';

import { Button } from '@shotly/ui/components/button';

import ServiceCard from '../../../studio/services/use-cases/see-services/service-card';
import BookServiceDialog from '../book-service/book-service-dialog';

type SeeServicesProps = {
  services: Service[];
  user?: AuthenticatedUser;
  photographerProfile: UserProfile;
};

function SeeServices(props: SeeServicesProps) {
  const { services, user, photographerProfile } = props;

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
            user ? (
              <BookServiceDialog
                userEmail={user.email}
                username={user.name}
                service={service}
                photographerProfile={photographerProfile}
              >
                <Button className="mr-4 mt-4 rounded-full">
                  {t('bookButton')}
                </Button>
              </BookServiceDialog>
            ) : null
          }
        />
      ))}
    </div>
  );
}

export default SeeServices;
