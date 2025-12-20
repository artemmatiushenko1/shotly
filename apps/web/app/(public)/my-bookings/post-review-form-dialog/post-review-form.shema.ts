import z from 'zod';

export const reviewFormSchema = z.object({
  orderId: z.string().min(1),
  rating: z.coerce.number().min(1, { error: 'Rating is required' }).max(5),
  comment: z.string().min(1, { error: 'Comment is required' }),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
