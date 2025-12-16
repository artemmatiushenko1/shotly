import z from 'zod';

import { FormActionState } from './form-action-state';

export async function validatedFormAction<
  T extends z.ZodType,
  D extends object,
>(
  schema: T,
  rawData: D,
  handler: (data: z.infer<T>) => Promise<FormActionState<z.infer<T>>>,
  options?: {
    normalizer?: (rawData: D) => unknown;
  },
): Promise<FormActionState<z.infer<T>>> {
  const rawInputs = options?.normalizer
    ? options.normalizer(rawData)
    : rawData instanceof FormData
      ? Object.fromEntries(rawData.entries())
      : rawData;

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
