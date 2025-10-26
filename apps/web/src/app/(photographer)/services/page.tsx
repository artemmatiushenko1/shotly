import MainHeader from '@/components/main-header';
import { Button } from '@shotly/ui/components/button';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import ServiceCard from './service-card';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import { Badge } from '@shotly/ui/components/badge';

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
        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger value="All">
              All <Badge className="h-5 min-w-5 rounded-full px-1">4</Badge>
            </TabsTrigger>
            <TabsTrigger value="Public">
              Public{' '}
              <Badge
                variant="secondary"
                className="h-5 min-w-5 rounded-full px-1"
              >
                4
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="Private">
              Private{' '}
              <Badge
                variant="secondary"
                className="h-5 min-w-5 rounded-full px-1"
              >
                0
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="Archived">
              Archived{' '}
              <Badge
                variant="secondary"
                className="h-5 min-w-5 rounded-full px-1"
              >
                0
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </>
  );
}

export default Services;
