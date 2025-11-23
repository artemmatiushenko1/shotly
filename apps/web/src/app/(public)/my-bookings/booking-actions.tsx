import { Button } from '@shotly/ui/components/button';
import { MessageSquareIcon, StarIcon } from 'lucide-react';
import React from 'react';
import LeaveReviewDialog from './leave-review-dialog';

type BookingActionsProps = {
  status: 'completed' | 'cancelled' | 'pending' | 'confirmed';
  onCancel: () => void;
  onLeaveReview: () => void;
  onMessage: () => void;
};

function BookingActions({ status }: BookingActionsProps) {
  return (
    <>
      <Button variant="outline" className="rounded-full">
        <MessageSquareIcon /> Message Photographer
      </Button>
      {status === 'completed' && (
        <LeaveReviewDialog>
          <Button className="rounded-full">
            <StarIcon /> Leave Review
          </Button>
        </LeaveReviewDialog>
      )}
      {status === 'pending' && (
        <Button variant="destructive" className="rounded-full">
          Cancel Booking
        </Button>
      )}
    </>
  );
}

export default BookingActions;
