import z from 'zod';

export type FormActionState<T, D = FormData> = {
  status: 'success' | 'error' | 'idle';
  message?: string;
  errors?: z.core.$ZodFlattenedError<T>['fieldErrors'];
  inputs?: Partial<D>;
};
