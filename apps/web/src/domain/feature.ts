import z from 'zod';

export const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type Feature = z.infer<typeof featureSchema>;
