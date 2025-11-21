import ServiceCard from '@/app/(photographer)/services/use-cases/see-services/service-card';
import { ServiceStatus } from '@/domain/service';
import { Button } from '@shotly/ui/components/button';
import { CalendarCheckIcon } from 'lucide-react';
import BookServiceDialog from '../book-service/book-service-dialog';

function SeeServices() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-4">
      <ServiceCard
        isPublicView
        id="1"
        coverUrl="https://placehold.co/600x400"
        name="Service 1"
        description="Description 1"
        price={'100'}
        priceUnit="USD"
        categoryName="Category 1"
        deliveryTime="10 days"
        features={['Feature 1', 'Feature 2']}
        status={ServiceStatus.PUBLIC}
        extraActions={
          <BookServiceDialog>
            <Button className="mr-4 mt-4">
              <CalendarCheckIcon /> Book
            </Button>
          </BookServiceDialog>
        }
      />
      <ServiceCard
        isPublicView
        id="1"
        coverUrl="https://placehold.co/600x400"
        name="Service 1"
        description="Description 1"
        price={'100'}
        priceUnit="USD"
        categoryName="Category 1"
        deliveryTime="10 days"
        features={['Feature 1', 'Feature 2']}
        status={ServiceStatus.PUBLIC}
        extraActions={
          <Button className="mr-4 mt-4">
            <CalendarCheckIcon />
            Book
          </Button>
        }
      />
      <ServiceCard
        isPublicView
        id="1"
        coverUrl="https://placehold.co/600x400"
        name="Service 1"
        description="Description 1"
        price={'100'}
        priceUnit="USD"
        categoryName="Category 1"
        deliveryTime="10 days"
        features={['Feature 1', 'Feature 2']}
        status={ServiceStatus.PUBLIC}
        extraActions={
          <Button className="mr-4 mt-4">
            <CalendarCheckIcon />
            Book
          </Button>
        }
      />
    </div>
  );
}

export default SeeServices;
