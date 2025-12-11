import z from 'zod';

import {
  ALLOWED_USERNAME_CHARS,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@/application/use-cases/account/constants';
import { locationDetailsSchema } from '@/entities/models/locations';

export const profileFormSchema = z.object({
  name: z.string().min(1, { error: 'Name must not be empty.' }),
  bio: z.string().max(500),
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH, { error: 'Username must not be empty.' })
    .max(MAX_USERNAME_LENGTH, {
      error: `Name must not be longer than ${MAX_USERNAME_LENGTH} characters.`,
    })
    .refine(
      (username) =>
        username
          .split('')
          .every((char) => ALLOWED_USERNAME_CHARS.includes(char)),
      {
        message: 'Username contains invalid characters.',
      },
    ),
  websiteUrl: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.url().optional(),
  ),
  instagramTag: z.string(),
  yearsOfExperience: z.coerce.number().min(0),
  languages: z.string().transform((str) => str.split(',')),
  locations: z
    .string()
    .transform((str) => JSON.parse(str))
    .pipe(z.array(locationDetailsSchema)),
  coverImageUrl: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.url().optional(),
  ),
  profileImageUrl: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.url().optional(),
  ),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export type ProfileFormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  errors?: z.core.$ZodFlattenedError<ProfileFormValues>['fieldErrors'];
  inputs?: Partial<ProfileFormValues>;
};
