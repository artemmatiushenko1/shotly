import z from 'zod';

import { languageSchema } from './language';
import { locationDetailsSchema } from './locations';

export enum ApprovalStatus {
  NOT_SUBMITTED = 'not_submitted',
  PENDING_REVIEW = 'pending_review',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum Role {
  UNKNOWN = 'unknown',
  CUSTOMER = 'customer',
  PHOTOGRAPHER = 'photographer',
}

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  username: z.string(),
  email: z.email(),
  coverImageUrl: z.url().nullish(),
  profileImageUrl: z.url().nullish(),
  yearsOfExperience: z.number().nullish(),
  bio: z.string().nullish(),
  aboutMe: z.string().nullish(),
  websiteUrl: z.url().nullish(),
  instagramTag: z.string().nullish(),
  createdAt: z.date(),
  approvalStatus: z.enum(ApprovalStatus),
});

export type User = z.infer<typeof userSchema>;

export const userProfileSchema = userSchema
  .pick({
    name: true,
    username: true,
    coverImageUrl: true,
    profileImageUrl: true,
    yearsOfExperience: true,
    bio: true,
    aboutMe: true,
    websiteUrl: true,
    instagramTag: true,
    createdAt: true,
    email: true,
  })
  .and(
    z.object({
      languages: z.array(languageSchema),
      locations: z.array(locationDetailsSchema),
    }),
  );

export type UserProfile = z.infer<typeof userProfileSchema>;

export const userUpdateInputSchema = userSchema
  .pick({
    name: true,
    username: true,
    coverImageUrl: true,
    profileImageUrl: true,
    yearsOfExperience: true,
    bio: true,
    aboutMe: true,
    websiteUrl: true,
    instagramTag: true,
  })
  .and(
    z.object({
      languages: z.array(languageSchema),
      locations: z.array(locationDetailsSchema),
    }),
  );

export type UpdateUserInput = z.infer<typeof userUpdateInputSchema>;

export const storageUsageSchema = z.object({
  storageUsage: z.number(),
  storageLimit: z.number(),
});

export type StorageUsage = z.infer<typeof storageUsageSchema>;
