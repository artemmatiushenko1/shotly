'use server';

import { revalidatePath } from 'next/cache';

import { updateProfileUseCase } from '@/application/use-cases/account';
import { TEMP_PROFILE_IMAGE_STORAGE_PATH } from '@/application/use-cases/images/constants';
import { uploadImageUseCase } from '@/application/use-cases/images/upload-image.use-case';
import { clientEnv } from '@/env/client';
import { getUser } from '@/infrastructure/services/auth/dal';
import { UploadResult } from '@/infrastructure/services/image-storage-service';
import { mbToBytes } from '@/utils/files/utils';
import { validatedAction } from '@/utils/server-actions';

import {
  profileFormSchema,
  ProfileFormState,
  ProfileFormValues,
} from './profile-form.schema';

const parseFormData = (formData: FormData): Partial<ProfileFormValues> => {
  const data = Object.fromEntries(formData.entries());
  return data as unknown as Partial<ProfileFormValues>;
};

export const updateProfileAction = async (
  prevState: ProfileFormState,
  form: FormData,
) =>
  validatedAction(
    profileFormSchema,
    form,
    async (data) => {
      const user = await getUser();
      await updateProfileUseCase(user.id, data);
      revalidatePath('/studio/settings');
      return { status: 'success', message: 'Profile updated successfully!' };
    },
    { normalizer: parseFormData },
  );

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
