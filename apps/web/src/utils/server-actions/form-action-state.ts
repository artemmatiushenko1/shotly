import z from 'zod';

export type FormActionState<T> = {
  status: 'success' | 'error' | 'idle';
  message?: string;
  errors?: z.core.$ZodFlattenedError<T>['fieldErrors'];
  inputs?: Partial<T>;
};
