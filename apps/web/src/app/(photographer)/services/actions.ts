'use server';

import { UnauthenticatedError } from '@/domain/errors/auth';
import { auth } from '@/lib/auth/auth';
import imageStorage from '@/lib/images/image-storage.service';
import { headers } from 'next/headers';
import z from 'zod';

const inputSchema = z.object({
  name: z.string().min(1, { error: 'Name is required' }),
  coverImage: z.instanceof(File).refine((file) => file.size <= 1024 * 1024, {
    error: 'Cover image must be less than 1MB',
  }),
  description: z.string().optional(),
  categoryId: z.string().min(1, { error: 'Category is required' }),
  price: z.coerce.number().min(0, { error: 'Price must be greater than 0' }),
  features: z
    .string()
    .transform((str) => str.split(','))
    .optional(),
  deliveryTime: z.coerce
    .number()
    .min(1, { error: 'Delivery time must be greater than 0' })
    .max(60, { error: 'Delivery time must be less than 60 days' }),
});

export const createService = async (
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
      coverImage:
        coverImageFile && coverImageFile.size > 0 ? coverImageFile : undefined,
    });

  if (inputParseError) {
    return {
      hasErrors: true,
      validationErrors: z.flattenError(inputParseError),
    };
  }

  await imageStorage.upload(validatedInput.coverImage, {
    folder: 'services',
    maxSize: 1 * 1024 * 1024, // 1MB
    allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  });

  return {
    hasErrors: false,
  };

  // TODO:
  // 1. create features
  // 2. create service
};
