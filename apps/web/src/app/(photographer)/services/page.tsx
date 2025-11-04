import MainHeader from '@/components/main-header';
import { Button } from '@shotly/ui/components/button';
import { PlusIcon } from 'lucide-react';
import ServiceCard from './service-card';
import CreateServiceDialog from './create-service/create-service-dialog';
import SeeServices from './see-services';
import categoriesRepository from '@/repositories/categories.repository';

const MOCK_SERVICES: React.ComponentProps<typeof ServiceCard>[] = [
  {
    coverUrl:
      'https://trulyphotographyut.com/wp-content/uploads/2019/06/2019-06-26_0093-1024x687.jpg',
    name: 'Family Photoset',
    description:
      'Photo session on a plain background with 20+ shots and basic retouching included.',
    price: '2 500',
    priceUnit: '₴',
    category: 'Family',
    deliveryTime: '5',
    features: ['100 edited photos', '10 printed copies'],
    isPublic: true,
  },
  {
    coverUrl:
      'https://www.shootproof.com/wp-content/uploads/header-sarah-jay-email.jpg',
    name: 'Wedding Documentary',
    description:
      'Full-day coverage capturing candid and posed moments with premium color grading.',
    price: '8 000',
    priceUnit: '₴',
    category: 'Wedding',
    deliveryTime: '14',
    features: ['300 edited photos', 'Highlight slideshow'],
    isPublic: true,
  },
  {
    coverUrl:
      'https://media.istockphoto.com/id/2099403180/photo/laughing-yougn-businesswoman-standing-with-her-arms-crossed-against-an-office-wall.jpg?s=612x612&w=0&k=20&c=kn6TM5y-26ohkuoAU9FiWn4pYoyVPS7xfWLVyBGj_TA=',
    name: 'Corporate Portraits',
    description:
      'Studio portraits for leadership teams with lighting setup and next-day turnaround.',
    price: '1 800',
    priceUnit: '₴',
    category: 'Corporate',
    deliveryTime: '3',
    features: ['15 retouched portraits'],
    isPublic: false,
  },
  {
    coverUrl:
      'https://www.xposurestudios.co.uk/wp-content/uploads/2021/03/peekaboo-newborn-photoshoot-034.jpg',
    name: 'Newborn Session',
    description:
      'Heartwarming newborn session at home with props, guidance, and gentle posing.',
    price: '3 200',
    priceUnit: '₴',
    category: 'Newborn',
    deliveryTime: '7',
    features: ['60 edited photos', 'Framed print'],
    isPublic: true,
  },
];

async function Services() {
  const categories = await categoriesRepository.getCategories();

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
      <div className="p-4">
        <SeeServices services={MOCK_SERVICES} />
      </div>
    </>
  );
}

export default Services;
