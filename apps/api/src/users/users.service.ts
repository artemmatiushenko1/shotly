import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './repository/users-repository.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: IUsersRepository) {}

  create() {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
