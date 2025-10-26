import MainHeader from '@/components/main-header';
import { Button } from '@shotly/ui/components/button';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import ServiceCard from './service-card';

function Services() {
  return (
    <>
      <MainHeader
        title="Services"
        caption="Create service packages available to your clients"
        extra={
          <Button className="ml-auto">
            <PlusIcon />
            Service
          </Button>
        }
      />
      <div className="p-4 flex flex-col gap-4">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </>
  );
}

export default Services;
