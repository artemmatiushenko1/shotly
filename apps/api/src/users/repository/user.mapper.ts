import { User } from '@shotly/contracts/users';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain = (persistenceEntity: UserEntity): User => {
    const domainEntity = new User();
    domainEntity.email = persistenceEntity.email;
    domainEntity.firstName = persistenceEntity.lastName;
    domainEntity.lastName = persistenceEntity.lastName;
    domainEntity.id = persistenceEntity.id;
    // TODO: rename password to passwordHash, hash directly in user service
    domainEntity.password = persistenceEntity.password;
    return domainEntity;
  };

  static toPersistence = (domainEntity: User): UserEntity => {
    const persistenceEntity = new UserEntity();
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.firstName = domainEntity.lastName;
    persistenceEntity.lastName = domainEntity.lastName;
    persistenceEntity.password = domainEntity.password;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    return persistenceEntity;
  };
}
