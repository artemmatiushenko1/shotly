import z from 'zod';

import { Role } from '@/entities/models/user';

export const updateUserRoleSchema = z.object({
  role: z.enum(Role),
});

export type UpdateUserRoleFormValues = z.infer<typeof updateUserRoleSchema>;
