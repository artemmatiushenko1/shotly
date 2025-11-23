import { Button } from '@shotly/ui/components/button';
import { CheckIcon } from 'lucide-react';
import React from 'react';

type OrderActionsProps = {
  status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
};

function OrderActions(props: OrderActionsProps) {
  const { status } = props;

  if (status === 'pending') {
    return (
      <>
        <Button
          variant="outline"
          className="rounded-full border-destructive text-destructive bg-transparent hover:bg-destructive/10 hover:text-destructive"
        >
          Reject
        </Button>
        <Button className="rounded-full bg-green-500 hover:bg-green-500/90">
          <CheckIcon /> Accept
        </Button>
      </>
    );
  }

  if (status === 'confirmed') {
    return (
      <Button className="rounded-full">
        <CheckIcon /> Complete
      </Button>
    );
  }

  return null;
}

export default OrderActions;
