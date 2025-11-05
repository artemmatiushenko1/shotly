import MainHeader from '@/components/main-header';
import { Button } from '@shotly/ui/components/button';
import { PlusIcon } from 'lucide-react';
import CreateServiceDialog from './create-service/create-service-dialog';
import SeeServices from './see-services';
import categoriesRepository from '@/repositories/categories.repository';
import servicesRepository from '@/repositories/services.repository';
import { auth } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { UnauthenticatedError } from '@/domain/errors/auth';
import { Service, ServiceStatus } from '@/domain/service';

const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    coverImageUrl:
      'https://trulyphotographyut.com/wp-content/uploads/2019/06/2019-06-26_0093-1024x687.jpg',
    name: 'Family Photoset',
    description:
      'Photo session on a plain background with 20+ shots and basic retouching included.',
    price: 2_500,
    currency: '₴',
    categoryId: '6edb43fa-c677-4281-92fe-a43fda4462ff',
    deliveryTimeInDays: 5,
    features: ['100 edited photos', '10 printed copies'],
    status: ServiceStatus.PUBLIC,
  },
  {
    id: '2',
    coverImageUrl:
      'https://www.shootproof.com/wp-content/uploads/header-sarah-jay-email.jpg',
    name: 'Wedding Documentary',
    description:
      'Full-day coverage capturing candid and posed moments with premium color grading.',
    price: 8_000,
    currency: '₴',
    categoryId: 'ad290b9d-779b-4635-a1dd-2a1dc5e1c05f',
    deliveryTimeInDays: 14,
    features: ['300 edited photos', 'Highlight slideshow'],
    status: ServiceStatus.PUBLIC,
  },
  {
    id: '3',
    coverImageUrl:
      'https://media.istockphoto.com/id/2099403180/photo/laughing-yougn-businesswoman-standing-with-her-arms-crossed-against-an-office-wall.jpg?s=612x612&w=0&k=20&c=kn6TM5y-26ohkuoAU9FiWn4pYoyVPS7xfWLVyBGj_TA=',
    name: 'Corporate Portraits',
    description:
      'Studio portraits for leadership teams with lighting setup and next-day turnaround.',
    price: 1_800,
    currency: '₴',
    categoryId: 'c2f02701-e315-4161-a08f-8d23feb1ad63',
    deliveryTimeInDays: 3,
    features: ['15 retouched portraits'],
    status: ServiceStatus.PRIVATE,
  },
  {
    id: '4',
    coverImageUrl:
      'https://www.xposurestudios.co.uk/wp-content/uploads/2021/03/peekaboo-newborn-photoshoot-034.jpg',
    name: 'Newborn Session',
    description:
      'Heartwarming newborn session at home with props, guidance, and gentle posing.',
    price: 3_200,
    currency: '₴',
    categoryId: 'f4181451-50a7-472a-b4fd-ec1b5b3c63ae',
    deliveryTimeInDays: 7,
    features: ['60 edited photos', 'Framed print'],
    status: ServiceStatus.PUBLIC,
  },
];

async function Services() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new UnauthenticatedError('User is not authenticated!');
  }

  const userId = session.user.id;
  const categories = await categoriesRepository.getCategories();
  const services = await servicesRepository.getAllServices(userId);

  return (
    <>
      <MainHeader
        title="Services"
        caption="Create service packages available to your clients"
        extra={
          <CreateServiceDialog categories={categories}>
            <Button className="ml-auto">
              <PlusIcon />
              Service
            </Button>
          </CreateServiceDialog>
        }
      />
      <div className="p-4 animate-in fade-in duration-300">
        <SeeServices
          categories={categories}
          services={[...MOCK_SERVICES, ...services]}
        />
      </div>
    </>
  );
}

export default Services;
