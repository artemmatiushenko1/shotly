import { User } from '@shotly/contracts/users';
import { IUsersRepository } from './users-repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly _usersRepository: Repository<UserEntity>,
  ) {}

  private toDomain = (entity: UserEntity): User => {
    return new User(entity.id, entity.firstName, entity.lastName, entity.email);
  };

  async create(user: User): Promise<User> {
    const savedEntity = await this._usersRepository.save(user);
    return this.toDomain(savedEntity);
  }

  async findAll(): Promise<User[]> {
    const foundEntities = await this._usersRepository.find();
    return foundEntities.map(this.toDomain);
  }

  async findOne(id: string): Promise<User | null> {
    const foundEntity = await this._usersRepository.findOne({ where: { id } });
    if (!foundEntity) return null;
    return this.toDomain(foundEntity);
  }

  async update(user: User): Promise<User> {
    await this._usersRepository.update(user.id, user);
    const foundEntity = await this._usersRepository.findOneOrFail({
      where: { id: user.id },
    });
    return this.toDomain(foundEntity);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this._usersRepository.delete(id);
    return !!result.affected && result.affected > 0;
  }
}
