import z from 'zod';

export const MAX_DURATION = 8;
export const MIN_DURATION = 1;
export const MAX_NOTES_LENGTH = 500;

export const bookServiceFormSchema = z.object({
  serviceId: z.string().min(1),
  photographerId: z.string().min(1),
  bookingDate: z
    .string({ error: 'Booking date is required' })
    .transform((str) => new Date(str))
    .pipe(z.date()),
  hours: z.coerce.number().min(MIN_DURATION).max(MAX_DURATION),
  notes: z.string().max(MAX_NOTES_LENGTH).nullish(),
});

export type BookServiceFormValues = z.infer<typeof bookServiceFormSchema>;
