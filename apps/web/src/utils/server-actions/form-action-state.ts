import z from 'zod';

export type FormActionState<T, R = void> = {
  status: 'success' | 'error' | 'idle';
  message?: string;
  errors?: z.core.$ZodFlattenedError<T>['fieldErrors'];
  inputs?: Partial<T>;
  response?: R;
};
