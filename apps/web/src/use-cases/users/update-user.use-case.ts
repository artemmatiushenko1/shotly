import { User, UserUpdate } from '@/domain/user';
import usersRepository from '@/repositories/users.repository';

export const updateUserUseCase = async (
  input: Partial<UserUpdate>,
  userId: string,
): Promise<User> => {
  // TODO: check if user updates their own profile
  return usersRepository.updateUser(userId, input);
};
