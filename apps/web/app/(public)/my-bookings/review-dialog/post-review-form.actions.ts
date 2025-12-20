'use server';

import { revalidatePath } from 'next/cache';

import { postOrderReviewUseCase } from '@/application/use-cases/orders';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import { reviewFormSchema, ReviewFormValues } from './post-review-form.shema';

export const postOrderReviewAction = async (
  prevState: FormActionState<ReviewFormValues>,
  formData: FormData,
) =>
  validatedFormAction(reviewFormSchema, formData, async (data) => {
    const user = await getAuthenticatedUserOrRedirect();

    await postOrderReviewUseCase(
      user.id,
      data.orderId,
      data.rating,
      data.comment,
    );

    revalidatePath('/my-bookings');

    return { status: 'success' };
  });
