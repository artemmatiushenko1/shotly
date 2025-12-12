import z from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().nonempty({ error: 'First name is required' }),
  lastName: z.string().nonempty({ error: 'Last name is required' }),
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
