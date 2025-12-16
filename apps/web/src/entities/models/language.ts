import z from 'zod';

export const languageSchema = z.object({
  code: z.string().min(1),
  flag: z.string().min(1),
  name: z.string().min(1),
  nameUk: z.string().min(1),
});

export type Language = z.infer<typeof languageSchema>;
