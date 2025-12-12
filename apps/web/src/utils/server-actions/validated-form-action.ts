import { isRedirectError } from 'next/dist/client/components/redirect-error';
import z from 'zod';

import { FormActionState } from './form-action-state';

export async function validatedAction<T extends z.ZodType>(
  schema: T,
  formData: FormData,
  handler: (data: z.infer<T>) => Promise<FormActionState<z.infer<T>>>,
  options?: {
    normalizer?: (formData: FormData) => unknown;
  },
): Promise<FormActionState<z.infer<T>>> {
  const rawInputs = options?.normalizer
    ? options.normalizer(formData)
    : Object.fromEntries(formData.entries());

  const validation = schema.safeParse(rawInputs);

  if (!validation.success) {
    return {
      status: 'error',
      message: 'Validation failed',
      errors: z.flattenError(validation.error).fieldErrors,
      inputs: rawInputs as Partial<z.infer<T>>,
    };
  }

  try {
    return await handler(validation.data);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error; // Re-throw so Next.js can handle the redirect
    }

    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return {
      status: 'error',
      message: errorMessage,
      inputs: rawInputs as Partial<z.infer<T>>,
    };
  }
}
