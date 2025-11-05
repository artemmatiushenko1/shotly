'use server';

import { UnauthenticatedError } from '@/domain/errors/auth';
import { ServiceStatus } from '@/domain/service';
import { auth } from '@/lib/auth/auth';
import imageStorage from '@/lib/images/image-storage.service';
import servicesRepository from '@/repositories/services.repository';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import z from 'zod';

const inputSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  coverImage: z.instanceof(File).refine((file) => file.size <= 1024 * 1024, {
    error: 'Cover image must be less than 1MB',
  }),
  currency: z.string().min(1, { error: 'Currency is required' }),
  description: z.string(),
  categoryId: z.string().min(1, { error: 'Category is required' }),
  price: z.coerce.number().min(0, { error: 'Price must be greater than 0' }),
  features: z
    .string()
    .transform((str) => str.split(','))
    .pipe(z.array(z.string()).min(1, { error: 'Features are required' })),
  deliveryTimeInDays: z.coerce
    .number()
    .min(1, { error: 'Delivery time must be greater than 0' })
    .max(60, { error: 'Delivery time must be less than 60 days' }),
  status: z.enum(ServiceStatus),
});

export const createService = async (
  // TODO: prevent form reset on error by using initialState, pass default values to form fields
  initialState: {
    hasErrors: boolean;
    validationErrors?: z.core.$ZodFlattenedError<z.infer<typeof inputSchema>>;
  },
  form: FormData,
) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

  if (!userId) {
    throw new UnauthenticatedError('User must be logged in to create service!');
  }

  const data = Object.fromEntries(form.entries());

  // Handle file separately since FormData.get() returns File | null
  const coverImageFile = form.get('coverImage') as File | null;
  const formDataWithoutFile = { ...data };
  delete formDataWithoutFile.coverImage;

  const { data: validatedInput, error: inputParseError } =
    inputSchema.safeParse({
      ...formDataWithoutFile,
      currency: 'UAH',
      coverImage:
        coverImageFile && coverImageFile.size > 0 ? coverImageFile : undefined,
    });

  if (inputParseError) {
    return {
      hasErrors: true,
      validationErrors: z.flattenError(inputParseError),
    };
  }

  const coverImageUploadResult = await imageStorage.upload(
    validatedInput.coverImage,
    {
      folder: 'services',
      maxSize: 1 * 1024 * 1024, // 1MB
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    },
  );

  await servicesRepository.createService(userId, {
    ...validatedInput,
    coverImageUrl: coverImageUploadResult.url,
  });

  revalidatePath('/services');

  return {
    hasErrors: false,
  };
};

export const archiveService = async (
  state: {
    success: boolean;
    error: boolean;
  },
  serviceId: string,
) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    throw new UnauthenticatedError('User must be logged in to create service!');
  }

  try {
    // TODO: first check if it exists
    await servicesRepository.archiveService(serviceId);
    revalidatePath('/services');
    return { success: true, error: false };
  } catch (error: unknown) {
    console.log({ error });
    return { success: false, error: true };
  }
};
