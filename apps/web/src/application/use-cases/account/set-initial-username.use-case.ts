import usersRepository from '@/infrastructure/repositories/users.repository';

import { ALLOWED_USERNAME_CHARS, DEFAULT_USERNAME_LENGTH } from './constants';

const setInitialUsernameUseCase = async (userId: string) => {
  let username = 'user_';

  for (let i = 0; i < DEFAULT_USERNAME_LENGTH; i++) {
    username += ALLOWED_USERNAME_CHARS.charAt(
      Math.floor(Math.random() * ALLOWED_USERNAME_CHARS.length),
    );
  }

  await usersRepository.setUsername(userId, username);
};

export { setInitialUsernameUseCase };
