import { NotFoundError } from '@/entities/errors/common';
import { Role } from '@/entities/models/user';
import usersRepository from '@/infrastructure/repositories/users.repository';

const setRoleUseCase = async (userId: string, role: Role) => {
  const user = await usersRepository.getUserById(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  await usersRepository.updateUserRole(userId, role);
};

export default setRoleUseCase;
