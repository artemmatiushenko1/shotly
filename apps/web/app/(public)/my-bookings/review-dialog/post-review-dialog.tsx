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
  isReadOnly: boolean;
};

function PostReviewDialog({
  children,
  order,
  isReadOnly,
}: PostReviewDialogProps) {
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
          defaultValues={{
            comment: order.review?.comment ?? '',
            rating: order.review?.rating ?? 0,
            orderId: order.id,
          }}
          isReadOnly={isReadOnly}
          onCancel={() => {
            setOpen(false);
          }}
          onSuccess={() => {
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
