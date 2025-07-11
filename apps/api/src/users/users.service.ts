import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserRepository } from './repository/user-repository.interface';
import { User } from '@shotly/contracts/users';
import {
  GetUserByEmailRequestDto,
  GetUserByEmailResponseDto,
  GetUserByIdRequestDto,
  GetUserByIdResponseDto,
} from './dto/get-user.dto';

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
    requestDto: GetUserByEmailRequestDto,
  ): Promise<GetUserByEmailResponseDto> {
    const user = await this.userRepository.findOneByEmail(requestDto.email);

    return { user };
  }

  async getUserById(
    requestDto: GetUserByIdRequestDto,
  ): Promise<GetUserByIdResponseDto> {
    const user = await this.userRepository.findOne(requestDto.id);
    if (!user) {
      throw new NotFoundException(
        `User with id ${requestDto.id} is not found.`,
      );
    }

    return { user };
  }
}
