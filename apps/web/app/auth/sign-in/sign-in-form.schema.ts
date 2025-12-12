import z from 'zod';

export const signInWithPasswordSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }),
});

export type SignInWithPasswordFormValues = z.infer<
  typeof signInWithPasswordSchema
>;
