import { Badge } from '@shotly/ui/components/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@shotly/ui/components/card';
import { CopyIcon } from 'lucide-react';
import Image from 'next/image';

const BookingStatusBadge = ({
  status,
}: {
  status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
}) => {
  switch (status) {
    case 'completed':
      return (
        <Badge className="bg-lime-600/10 px-3 py-1 rounded-full text-lime-600">
          Completed
        </Badge>
      );
    case 'confirmed':
      return (
        <Badge className="bg-sky-600/10 px-3 py-1 rounded-full text-sky-600">
          Confirmed
        </Badge>
      );
    case 'cancelled':
      return (
        <Badge className="bg-red-600/10 px-3 py-1 rounded-full text-red-600">
          Cancelled
        </Badge>
      );
    case 'pending':
      return (
        <Badge className="bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-500">
          Pending
        </Badge>
      );
  }
};

type OrderCardProps = {
  status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
  actions: React.ReactNode;
  userInfo: React.ReactNode;
};

function OrderCard({ status, actions, userInfo }: OrderCardProps) {
  return (
    <Card className="shadow-none pb-0 overflow-hidden">
      <CardHeader className="flex justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Booking Date</p>
          <p className="text-xl font-bold">Sat, Jan 1, 2025</p>
        </div>
        {userInfo}
        <div>
          <p className="text-xs text-muted-foreground mb-1">Booking ID</p>
          <p className="text-md font-bold inline-flex items-center gap-2">
            #1234567890{' '}
            <CopyIcon className="size-4 cursor-pointer text-muted-foreground" />
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <BookingStatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="shadow-none flex flex-row items-center gap-4 mb-4">
          <div className="size-[60px] overflow-hidden rounded-sm shrink-0">
            <Image
              unoptimized
              src="https://placehold.co/600x400"
              alt="Service Image"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold">Full Day Wedding Coverage</h3>
            <p className="text-xs text-muted-foreground">
              Full coverage capturing candid and posed moments.
            </p>
          </div>
          <div className="ml-auto mr-2">
            <span className="text-md font-bold">грн 8,000</span>{' '}
            <span className="text-xs text-muted-foreground text-nowrap">
              / hour
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted pb-5 gap-2">
        <div>
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-md font-bold">
            16,000 грн{' '}
            <span className="text-xs text-muted-foreground text-nowrap font-normal">
              (2 hours)
            </span>
          </p>
        </div>
        <div className="flex gap-2">{actions}</div>
      </CardFooter>
    </Card>
  );
}

export default OrderCard;
