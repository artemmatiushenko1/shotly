import { Provider } from '@nestjs/common';
import { IUserRepository } from './user-repository.interface';
import { UserRepository } from './user-repository.impl';

export const UserRepositoryProvider: Provider = {
  provide: IUserRepository,
  useClass: UserRepository,
};
