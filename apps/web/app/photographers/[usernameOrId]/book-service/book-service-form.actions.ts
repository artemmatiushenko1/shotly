'use server';

import { createOrderUseCase } from '@/application/use-cases/orders';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import {
  bookServiceFormSchema,
  BookServiceFormValues,
} from './book-service-form.schema';

export const createOrderAction = async (
  prevState: FormActionState<BookServiceFormValues, string>,
  formData: FormData,
) =>
  validatedFormAction(bookServiceFormSchema, formData, async (data) => {
    const user = await getAuthenticatedUserOrRedirect();

    const orderId = await createOrderUseCase({
      bookingDate: data.bookingDate,
      hours: data.hours,
      notes: data.notes,
      clientId: user.id,
      serviceId: data.serviceId,
      photographerId: data.photographerId,
    });

    return {
      status: 'success',
      response: orderId,
    };
  });
