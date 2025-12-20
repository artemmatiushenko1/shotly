import { useTranslations } from 'next-intl';
import React, { useActionState, useEffect, useState } from 'react';

import { MAX_REVIEW_COMMENT_CHARS } from '@/entities/models/review';

import { Button } from '@shotly/ui/components/button';
import { Label } from '@shotly/ui/components/label';
import { StarRating } from '@shotly/ui/components/star-rating';
import { Textarea } from '@shotly/ui/components/textarea';

import { postOrderReviewAction } from './post-review-form.actions';
import { ReviewFormValues } from './post-review-form.shema';

type PostReviewFormProps = {
  orderId: string;
  photographerName: string;
  serviceName: string;
  isReadOnly: boolean;
  defaultValues: ReviewFormValues;
  onCancel: () => void;
  onSuccess: () => void;
};

function PostReviewForm({
  orderId,
  photographerName,
  serviceName,
  onCancel,
  isReadOnly,
  defaultValues,
  onSuccess,
}: PostReviewFormProps) {
  const t = useTranslations('myBookings.leaveReview');

  const [state, formAction, isPending] = useActionState(postOrderReviewAction, {
    status: 'idle',
  });

  useEffect(() => {
    if (state.status === 'success') {
      onSuccess();
    }
  }, [state.status, onSuccess]);

  const { inputs = {}, errors = {} } = state;
  const values = { ...defaultValues, ...inputs };

  const [rating, setRating] = useState(values.rating);

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
          size="lg"
          rating={rating}
          readonly={isReadOnly}
          onRatingChange={setRating}
          error={errors.rating?.join(', ')}
        />
        <input type="hidden" name="rating" value={rating} />
      </div>
      <div className="space-y-2 grid gap-3">
        <Label>{t('feedbackLabel')}</Label>
        <Textarea
          showCharsCount
          readOnly={isReadOnly}
          name="comment"
          defaultValue={values.comment}
          maxChars={MAX_REVIEW_COMMENT_CHARS}
          className="bg-muted shadow-none min-h-[125px] w-full"
          placeholder={t('feedbackPlaceholder')}
          error={errors.comment?.join(', ')}
        />
      </div>
      {!isReadOnly && (
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
          <Button
            type="submit"
            size="lg"
            className="flex-1"
            loading={isPending}
          >
            {t('postReview')}
          </Button>
        </div>
      )}

      <input type="hidden" name="orderId" value={orderId} />
    </form>
  );
}

export default PostReviewForm;
