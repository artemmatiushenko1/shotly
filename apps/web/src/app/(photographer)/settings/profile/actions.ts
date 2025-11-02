'use server';

import { UnauthenticatedError } from '@/domain/errors/auth';
import { locationDetailsSchema } from '@/domain/locations';
import { auth } from '@/lib/auth/auth';
import imageStorage from '@/lib/images/image-storage.service';
import usersRepository from '@/repositories/users.repository';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import z from 'zod';

const inputSchema = z.object({
  name: z.string().min(1, { error: 'Name must not be empty.' }),
  bio: z.string().max(500),
  username: z.string().min(1, { error: 'Username must not be empty.' }),
  websiteUrl: z.url(),
  instagramTag: z.string(),
  yearsOfExperience: z.coerce.number().min(0),
  languages: z.string().transform((str) => str.split(',')),
  locations: z
    .string()
    .transform((str) => JSON.parse(str))
    .pipe(z.array(locationDetailsSchema)),
  profileImg: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Image must be less than 5MB',
    )
    .refine(
      (file) =>
        !file ||
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          file.type,
        ),
      'Image must be JPEG, PNG, or WebP',
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
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  if (!userId) {
    throw new UnauthenticatedError('User must be logged in to update profile!');
  }

  const data = Object.fromEntries(form.entries());

  // Handle file separately since FormData.get() returns File | null
  const profileImgFile = form.get('profileImg') as File | null;
  const formDataWithoutFile = { ...data };
  delete formDataWithoutFile.profileImg;

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse({
      ...formDataWithoutFile,
      profileImg:
        profileImgFile && profileImgFile.size > 0 ? profileImgFile : undefined,
    });

  if (inputParseError) {
    return {
      hasErrors: true,
      validationErrors: z.flattenError(inputParseError),
    };
  }

  // Upload profile image if provided
  let profileImageUrl: string | undefined;

  if (validatedInput.profileImg) {
    const uploadResult = await imageStorage.upload(validatedInput.profileImg, {
      folder: 'profiles',
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    });
    profileImageUrl = uploadResult.url;
  }

  // Prepare update data (exclude profileImg as it's not part of UserUpdate)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profileImg, ...baseUpdateData } = validatedInput;

  // Build the update object, including image URL only if a new one was uploaded
  const userUpdateData: Parameters<typeof usersRepository.updateUser>[1] = {
    ...baseUpdateData,
    ...(profileImageUrl ? { image: profileImageUrl } : {}),
  };

  // TODO: should be a single transaction
  await usersRepository.updateUser(userId, userUpdateData);
  await usersRepository.updateUserLanguages(userId, validatedInput.languages);
  await usersRepository.updateUserLocations(userId, validatedInput.locations);

  revalidatePath('/settings');

  return { hasErrors: false };
};
