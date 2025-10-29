import z from 'zod';

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  username: z.string().min(1).nullable(), // TODO: generate random username on signup
  email: z.email(),
  coverImageUrl: z.url().nullable(),
  image: z.url().nullable(), // profile picture
  yearsOfExperience: z.number().nullable(),
  bio: z.string().optional(),
  websiteUrl: z.url().nullable(),
  instagramTag: z.string().nullable(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

export const updateUserSchema = userSchema.pick({
  name: true,
  username: true,
  coverImageUrl: true,
  image: true,
  yearsOfExperience: true,
  bio: true,
  websiteUrl: true,
  instagramTag: true,
});

export type UserUpdate = z.infer<typeof updateUserSchema>;
