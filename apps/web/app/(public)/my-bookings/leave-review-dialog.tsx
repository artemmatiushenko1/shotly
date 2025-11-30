'use client';

import { Button } from '@shotly/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shotly/ui/components/dialog';
import { Label } from '@shotly/ui/components/label';
import { Textarea } from '@shotly/ui/components/textarea';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

type LeaveReviewDialogProps = {
  children: React.ReactNode;
};

function LeaveReviewDialog({ children }: LeaveReviewDialogProps) {
  const t = useTranslations('myBookings.leaveReview');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition-transform hover:scale-110 duration-150"
              >
                <StarIcon
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-200'
                  }`}
                />
              </button>
            ))}
          </div>
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
