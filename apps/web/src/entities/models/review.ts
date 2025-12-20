import z from 'zod';

export const MAX_REVIEW_COMMENT_CHARS = 500;

export const reviewSchema = z.object({
  id: z.string(),
  rating: z.number(),
  comment: z.string().max(MAX_REVIEW_COMMENT_CHARS),
  orderId: z.string(),
  createdAt: z.date(),
});

export type Review = z.infer<typeof reviewSchema>;

export const createReviewInputSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
  orderId: z.string(),
});

export type CreateReviewInput = z.infer<typeof createReviewInputSchema>;
