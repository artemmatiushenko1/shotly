'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { updateProfileUseCase } from '@/application/use-cases/account';
import {
  ALLOWED_USERNAME_CHARS,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@/application/use-cases/account/constants';
import { uploadImageUseCase } from '@/application/use-cases/images/upload-image.use-case';
import { locationDetailsSchema } from '@/entities/models/locations';
import { clientEnv } from '@/env/client';
import { getUser } from '@/infrastructure/services/auth/dal';
import { UploadResult } from '@/infrastructure/services/image-storage-service';
import { mbToBytes } from '@/utils/files/utils';
import { TEMP_PROFILE_IMAGE_STORAGE_PATH } from '@/application/use-cases/images/constants';

const inputSchema = z.object({
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

type UpdateProfileValidationErrors = z.core.$ZodFlattenedError<
  z.infer<typeof inputSchema>
>;

export const updateProfileAction = async (
  initialState: {
    hasErrors: boolean;
    validationErrors?: UpdateProfileValidationErrors;
  },
  form: FormData,
) => {
  const user = await getUser();

  const data = Object.fromEntries(form.entries());

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse(data);

  if (inputParseError) {
    return {
      hasErrors: true,
      validationErrors: z.flattenError(inputParseError),
    };
  }

  await updateProfileUseCase(user.id, validatedInput);

  revalidatePath('/studio/settings');

  return { hasErrors: false };
};

export const uploadTmpProfileImage = async (
  file: File,
): Promise<UploadResult> => {
  const uploadResult = await uploadImageUseCase(
    file,
    TEMP_PROFILE_IMAGE_STORAGE_PATH,
    mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_IMAGE_SIZE_MB),
  );

  return uploadResult;
};
