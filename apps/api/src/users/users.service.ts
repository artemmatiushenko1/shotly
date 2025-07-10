import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './repository/user-repository.interface';
import { User } from '@shotly/contracts/users';
import {
  GetUserByEmailRequestDto,
  GetUserByEmailResponseDto,
} from './dto/get-user-by-email.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const user = new User();
    user.email = createUserRequestDto.email;
    user.firstName = createUserRequestDto.firstName;
    user.lastName = createUserRequestDto.lastName;
    user.password = createUserRequestDto.password;

    const result = await this.userRepository.create(user);

    return result;
  }

  async getUserByEmail(
    getUserByEmailRequestDto: GetUserByEmailRequestDto,
  ): Promise<GetUserByEmailResponseDto> {
    const user = await this.userRepository.findOneByEmail(
      getUserByEmailRequestDto.email,
    );

    return { user };
  }
}
