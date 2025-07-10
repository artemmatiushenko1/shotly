import { User } from '@shotly/contracts/users';
import { IUserRepository } from './user-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    const foundEntity = await this._userRepository.findOne({
      where: { email },
    });

    if (!foundEntity) {
      return null;
    }

    return UserMapper.toDomain(foundEntity);
  }

  async create(user: User): Promise<User> {
    const savedEntity = await this._userRepository.save(
      UserMapper.toPersistence(user),
    );

    return UserMapper.toDomain(savedEntity);
  }

  async findAll(): Promise<User[]> {
    const foundEntities = await this._userRepository.find();
    return foundEntities.map(UserMapper.toDomain);
  }

  async findOne(id: string): Promise<User | null> {
    const foundEntity = await this._userRepository.findOne({ where: { id } });
    if (!foundEntity) return null;
    return UserMapper.toDomain(foundEntity);
  }

  async update(user: User): Promise<User> {
    await this._userRepository.update(user.id, UserMapper.toPersistence(user));
    const foundEntity = await this._userRepository.findOneOrFail({
      where: { id: user.id },
    });
    return UserMapper.toDomain(foundEntity);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this._userRepository.delete(id);
    return !!result.affected && result.affected > 0;
  }
}
