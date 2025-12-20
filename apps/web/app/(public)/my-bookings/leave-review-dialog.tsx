'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@shotly/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Label } from '@shotly/ui/components/label';
import { StarRating } from '@shotly/ui/components/star-rating';
import { Textarea } from '@shotly/ui/components/textarea';

type LeaveReviewDialogProps = {
  children: React.ReactNode;
};

function LeaveReviewDialog({ children }: LeaveReviewDialogProps) {
  const t = useTranslations('myBookings.leaveReview');

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="mb-6 text-center">
            <h4 className="text-base font-medium">
              {t('question', { photographerName: 'Артем Матюшенко' })}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              Індивідуальна фотосесія
            </p>
          </div>
          <StarRating rating={rating} onRatingChange={setRating} size="lg" />
        </div>
        <div className="space-y-2">
          <Label>{t('feedbackLabel')}</Label>
          <Textarea
            value={comment}
            showCharsCount
            maxChars={500}
            className="bg-muted resize-none shadow-none min-h-[125px]"
            onChange={(e) => setComment(e.target.value)}
            placeholder={t('feedbackPlaceholder')}
          />
        </div>
        <div></div>
        <div className="flex gap-3">
          <Button size="lg" variant="outline" className="flex-1">
            {t('cancel')}
          </Button>
          <Button size="lg" className="flex-1">
            {t('postReview')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LeaveReviewDialog;
