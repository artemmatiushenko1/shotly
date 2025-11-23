import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@shotly/ui/components/avatar';
import { Skeleton } from '@shotly/ui/components/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@shotly/ui/components/tooltip';
import { UserIcon } from 'lucide-react';
import React from 'react';

type ClientInfoProps = {
  orderStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled';
};

function ClientInfo({ orderStatus }: ClientInfoProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">Client</p>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          {['pending', 'cancelled'].includes(orderStatus) ? (
            <Tooltip>
              <TooltipTrigger>
                <Skeleton animation="none" className="w-15 h-3 mb-1" />
                <Skeleton animation="none" className="w-10 h-3" />
              </TooltipTrigger>
              <TooltipContent>Accept to reveal contact info</TooltipContent>
            </Tooltip>
          ) : (
            <>
              <p className="text-sm font-bold">John Doe</p>
              <p className="text-xs text-muted-foreground">hello@example.com</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
