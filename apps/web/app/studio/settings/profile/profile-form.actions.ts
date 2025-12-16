'use server';

import { revalidatePath } from 'next/cache';

import { updateProfileUseCase } from '@/application/use-cases/account';
import { PROFILE_IMAGES_BUCKET_NAME } from '@/application/use-cases/images/constants';
import { getAuthenticatedUserOrRedirect } from '@/infrastructure/services/auth/dal';
import { s3ImageStorage } from '@/infrastructure/services/s3-image-storage-service';
import { FormActionState, validatedFormAction } from '@/utils/server-actions';

import { profileFormSchema, ProfileFormValues } from './profile-form.schema';

export const updateProfileAction = async (
  prevState: FormActionState<ProfileFormValues>,
  formData: FormData,
) =>
  validatedFormAction(profileFormSchema, formData, async (data) => {
    const user = await getAuthenticatedUserOrRedirect();
    await updateProfileUseCase(user.id, data);
    revalidatePath('/studio/settings');
    return { status: 'success', message: 'Profile updated successfully!' };
  });

export const uploadTmpProfileImage = async (file: File): Promise<string> => {
  const { uploadUrl, publicUrl } = await s3ImageStorage.prepareUpload(
    file.name,
    file.type,
    PROFILE_IMAGES_BUCKET_NAME,
  );

  await fetch(uploadUrl, {
    method: 'PUT',
    body: file,
  });

  return publicUrl;
};
