import { useTranslations } from 'next-intl';
import React, { useActionState, useState } from 'react';

import { MAX_REVIEW_COMMENT_CHARS } from '@/entities/models/review';

import { Button } from '@shotly/ui/components/button';
import { Label } from '@shotly/ui/components/label';
import { StarRating } from '@shotly/ui/components/star-rating';
import { Textarea } from '@shotly/ui/components/textarea';

import { postOrderReviewAction } from './post-review-form.actions';

type PostReviewFormProps = {
  orderId: string;
  photographerName: string;
  serviceName: string;
  onCancel: () => void;
};

function PostReviewForm({
  orderId,
  photographerName,
  serviceName,
  onCancel,
}: PostReviewFormProps) {
  const t = useTranslations('myBookings.leaveReview');

  const [state, formAction, isPending] = useActionState(postOrderReviewAction, {
    status: 'idle',
  });

  const [rating, setRating] = useState(0);

  const { inputs = {}, errors = {} } = state;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="p-6">
        <div className="mb-6 text-center">
          <h4 className="text-base font-medium">
            {t('question', { photographerName })}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">{serviceName}</p>
        </div>
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          size="lg"
          error={errors.rating?.join(', ')}
        />
        <input type="hidden" name="rating" value={rating} />
      </div>
      <div className="space-y-2 grid gap-3">
        <Label>{t('feedbackLabel')}</Label>
        <Textarea
          showCharsCount
          name="comment"
          defaultValue={inputs.comment}
          maxChars={MAX_REVIEW_COMMENT_CHARS}
          className="bg-muted shadow-none min-h-[125px] w-full"
          placeholder={t('feedbackPlaceholder')}
          error={errors.comment?.join(', ')}
        />
      </div>
      <div className="flex gap-3">
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          {t('cancel')}
        </Button>
        <Button type="submit" size="lg" className="flex-1" loading={isPending}>
          {t('postReview')}
        </Button>
      </div>
      <input type="hidden" name="orderId" value={orderId} />
    </form>
  );
}

export default PostReviewForm;
