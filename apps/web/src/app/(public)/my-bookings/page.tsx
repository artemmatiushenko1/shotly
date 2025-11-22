import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@shotly/ui/components/tabs';
import BookingCard from './booking-card';
import { unstable_ViewTransition as ViewTransition } from 'react';

function MyBookings() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <p className="text-sm text-muted-foreground mb-4">
        View the status of your bookings
      </p>
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <div className="min-h-[300px]">
          <ViewTransition>
            <TabsContent value="upcoming" className="flex flex-col gap-4">
              <BookingCard status="pending" />
              <BookingCard status="confirmed" />
            </TabsContent>
            <TabsContent value="past">
              <BookingCard status="completed" />
            </TabsContent>
            <TabsContent value="cancelled">
              <BookingCard status="cancelled" />
            </TabsContent>
          </ViewTransition>
        </div>
      </Tabs>
    </div>
  );
}

export default MyBookings;
