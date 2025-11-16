import z from 'zod';
import { languageSchema } from './language';
import { locationDetailsSchema } from './locations';

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  username: z.string().min(1).nullable(), // TODO: generate random username on signup
  email: z.email(),
  coverImageUrl: z.url().nullable(),
  image: z.url().nullable(), // profile picture
  yearsOfExperience: z.number().nullable(),
  bio: z.string().nullable(),
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

export const userProfileSchema = userSchema
  .pick({
    name: true,
    username: true,
    coverImageUrl: true,
    image: true,
    yearsOfExperience: true,
    bio: true,
    websiteUrl: true,
    instagramTag: true,
    createdAt: true,
  })
  .and(
    z.object({
      languages: z.array(languageSchema),
      locations: z.array(locationDetailsSchema),
    }),
  );

export type UserProfile = z.infer<typeof userProfileSchema>;

export const storageUsageSchema = z.object({
  storageUsage: z.number(),
  storageLimit: z.number(),
});

export type StorageUsage = z.infer<typeof storageUsageSchema>;
