import { User } from '@shotly/contracts/users';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain = (persistenceEntity: UserEntity): User => {
    const domainEntity = new User();
    domainEntity.email = persistenceEntity.email;
    domainEntity.firstName = persistenceEntity.lastName;
    domainEntity.lastName = persistenceEntity.lastName;
    domainEntity.id = persistenceEntity.id;
    return domainEntity;
  };

  static toPersistence = (domainEntity: User): UserEntity => {
    const persistenceEntity = new UserEntity();
    persistenceEntity.email = domainEntity.email;
    persistenceEntity.firstName = domainEntity.lastName;
    persistenceEntity.lastName = domainEntity.lastName;
    persistenceEntity.id = domainEntity.id;
    return persistenceEntity;
  };
}
