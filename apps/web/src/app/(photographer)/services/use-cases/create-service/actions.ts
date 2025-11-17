'use server';

import { ServiceStatus } from '@/domain/service';
import { getUser } from '@/lib/auth/dal';
import imageStorage from '@/lib/images/image-storage.service';
import servicesRepository from '@/repositories/services.repository';
import { revalidatePath } from 'next/cache';
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
  const user = await getUser();

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

  await servicesRepository.createService(user.id, {
    ...validatedInput,
    coverImageUrl: coverImageUploadResult.url,
  });

  revalidatePath('/services');

  return {
    hasErrors: false,
  };
};
