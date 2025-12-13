import z from 'zod';

import { FormActionState } from './form-action-state';

export async function validatedFormAction<T extends z.ZodType>(
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

  return await handler(validation.data);
}
