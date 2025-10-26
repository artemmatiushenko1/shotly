'use client';

import MainHeader from '@/components/main-header';
import { Button } from '@shotly/ui/components/button';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import ServiceCard from './service-card';
import { Tabs, TabsList, TabsTrigger } from '@shotly/ui/components/tabs';
import { Badge } from '@shotly/ui/components/badge';

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
    deliverables: ['100 edited photos', '10 printed copies'],
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
    deliverables: ['300 edited photos', 'Highlight slideshow'],
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
    deliverables: ['15 retouched portraits'],
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
    deliverables: ['60 edited photos', 'Framed print'],
    isPublic: true,
  },
];

function Services() {
  const [selectedTab, setSelectedTab] = useState('All');

  const tabs = ['All', 'Public', 'Private', 'Archived'];
  const counts = {
    'All': MOCK_SERVICES.length,
    'Public': MOCK_SERVICES.filter((s) => s.isPublic).length,
    'Private': MOCK_SERVICES.filter((s) => !s.isPublic).length,
    'Archived': '0',
  };

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
        <Tabs
          defaultValue="All"
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}{' '}
                <Badge
                  variant={tab === selectedTab ? 'default' : 'secondary'}
                  className="h-5 min-w-5 rounded-full px-1"
                >
                  {counts[tab as keyof typeof counts]}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {MOCK_SERVICES.map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      </div>
    </>
  );
}

export default Services;
