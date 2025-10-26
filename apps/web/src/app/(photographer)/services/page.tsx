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
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard />
      </div>
    </>
  );
}

export default Services;
