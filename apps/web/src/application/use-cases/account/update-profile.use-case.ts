import { ConflictError, NotFoundError } from '@/entities/errors/common';
import { LocationDetails } from '@/entities/models/locations';
import { UpdateUserInput } from '@/entities/models/user';
import usersRepository from '@/infrastructure/repositories/users.repository';

const updateProfileUseCase = async (
  userId: string,
  input: Omit<UpdateUserInput, 'languages' | 'locations'> & {
    languages: string[];
    locations: LocationDetails[];
  },
) => {
  // TODO: should be a single transaction
  const user = await usersRepository.getUserById(userId);

  if (!user) {
    throw new NotFoundError(`User ${userId} not found`);
  }

  if (input.username) {
    const userByUsername = await usersRepository.getUserByUsername(
      input.username,
    );

    if (userByUsername && userByUsername.id !== userId) {
      throw new ConflictError(`Username ${input.username} is already taken`);
    }
  }

  const { languages, locations, ...rest } = input;

  await usersRepository.updateUser(userId, rest);

  if (languages) {
    await usersRepository.updateUserLanguages(userId, input.languages);
  }

  if (input.locations) {
    await usersRepository.updateUserLocations(userId, locations);
  }
};

export { updateProfileUseCase };
