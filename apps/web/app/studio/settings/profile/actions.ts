'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { uploadImageUseCase } from '@/application/use-cases/images/upload-image.use-case';
import { locationDetailsSchema } from '@/domain/locations';
import { clientEnv } from '@/env/client';
import { getUser } from '@/infrastructure/services/auth/dal';
import { UploadResult } from '@/infrastructure/services/image-storage-service';
import usersRepository from '@/repositories/users.repository';
import { mbToBytes } from '@/utils/files/utils';

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
      (file) => !file || file.size <= 1 * 1024 * 1024,
      'Image must be less than 1MB',
    )
    .refine(
      (file) =>
        !file ||
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          file.type,
        ),
      'Image must be JPEG, PNG, or WebP',
    ),
  coverImg: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 1 * 1024 * 1024,
      'Image must be less than 1MB',
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
  const user = await getUser();

  const data = Object.fromEntries(form.entries());

  const profileImgFile = form.get('profileImg') as File | null;
  const coverImgFile = form.get('coverImg') as File | null;

  const formDataWithoutFiles = { ...data };
  delete formDataWithoutFiles.profileImg;
  delete formDataWithoutFiles.coverImg;

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse({
      ...formDataWithoutFiles,
      profileImg:
        profileImgFile && profileImgFile.size > 0 ? profileImgFile : undefined,
      coverImg:
        coverImgFile && coverImgFile.size > 0 ? coverImgFile : undefined,
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
    // TODO: we already have tmp image upload, move tmp image file in use case
    const PERMANENT_PROFILE_IMAGE_STORAGE_PATH = 'profiles';

    const { url } = await uploadImageUseCase(
      validatedInput.profileImg,
      PERMANENT_PROFILE_IMAGE_STORAGE_PATH,
      mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_IMAGE_SIZE_MB),
    );

    profileImageUrl = url;
  }

  // Upload cover image if provided
  let coverImageUrl: string | undefined;
  if (validatedInput.coverImg) {
    // TODO: we already have tmp image upload, move tmp image file in use case
    const PERMANENT_COVER_IMAGE_STORAGE_PATH = 'covers';

    const { url } = await uploadImageUseCase(
      validatedInput.coverImg,
      PERMANENT_COVER_IMAGE_STORAGE_PATH,
      mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_COVER_IMAGE_SIZE_MB),
    );

    coverImageUrl = url;
  }

  // Prepare update data (exclude files as they're not part of UserUpdate)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { profileImg, coverImg, ...baseUpdateData } = validatedInput;

  // Build the update object, including image URLs only if new ones were uploaded
  const userUpdateData = {
    ...baseUpdateData,
    ...(profileImageUrl ? { image: profileImageUrl } : {}),
    ...(coverImageUrl ? { coverImageUrl } : {}),
  };

  // TODO: should be a single transaction
  await usersRepository.updateUser(user.id, userUpdateData);
  await usersRepository.updateUserLanguages(user.id, validatedInput.languages);
  await usersRepository.updateUserLocations(user.id, validatedInput.locations);

  revalidatePath('/studio/settings');

  return { hasErrors: false };
};

const TMP_PROFILE_IMAGE_STORAGE_PATH = '/tmp/profiles';

export const uploadTmpProfileImage = async (
  file: File,
): Promise<UploadResult> => {
  const uploadResult = await uploadImageUseCase(
    file,
    TMP_PROFILE_IMAGE_STORAGE_PATH,
    mbToBytes(clientEnv.NEXT_PUBLIC_MAX_PROFILE_IMAGE_SIZE_MB),
  );

  return uploadResult;
};
