import { Provider } from '@nestjs/common';
import { IUsersRepository } from './users-repository.interface';
import { UsersRepository } from './users-repository.impl';

export const UsersRepositoryProvider: Provider = {
  provide: IUsersRepository,
  useClass: UsersRepository,
};
