import { User } from '@shotly/contracts/users';

export abstract class IUserRepository {
  abstract create(user: User): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findOne(id: string): Promise<User | null>;

  abstract findOneByEmail(email: string): Promise<User | null>;

  abstract update(user: User): Promise<User>;

  abstract remove(id: string): Promise<boolean>;
}
