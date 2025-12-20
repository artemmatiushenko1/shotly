'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Order } from '@/entities/models/order';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';

import PostReviewForm from './post-review-form';

type PostReviewDialogProps = {
  children: React.ReactNode;
  order: Order;
};

function PostReviewDialog({ children, order }: PostReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('myBookings.leaveReview');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <PostReviewForm
          onCancel={() => {
            setOpen(false);
          }}
          orderId={order.id}
          photographerName={order.photographer.name}
          serviceName={order.service.name}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PostReviewDialog;
