import z from 'zod';

import {
  ALLOWED_USERNAME_CHARS,
  MAX_ABOUT_ME_LENGTH,
  MAX_BIO_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@/application/use-cases/account/constants';
import { locationDetailsSchema } from '@/entities/models/locations';

export const profileFormSchema = z.object({
  name: z.string().min(1, { error: 'Name must not be empty.' }),
  bio: z.string().max(MAX_BIO_LENGTH),
  aboutMe: z.string().max(MAX_ABOUT_ME_LENGTH),
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
    z.url().nullish(),
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
    z.url().nullish(),
  ),
  profileImageUrl: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.url().nullish(),
  ),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
