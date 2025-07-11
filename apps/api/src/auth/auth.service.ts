import {
  GetProfileResponseDto,
  SignUpRequestDto,
} from '@shotly/contracts/auth';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserRequestDto } from 'src/users/dto/create-user.dto';
import { AuthUser } from './types/auth-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | null> {
    console.log({ email, password });

    const { user } = await this.usersService.getUserByEmail({ email });

    if (!user) return null;

    const hashedPassword = user.password;
    const isPasswordsMatch = await bcrypt.compare(password, hashedPassword);

    return isPasswordsMatch ? user : null;
  }

  signIn(user?: AuthUser) {
    if (!user) throw new UnauthorizedException();

    const payload = { sub: user.id };

    // TODO: attach access token to http only cookie
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(requestDto: SignUpRequestDto): Promise<{ accessToken: string }> {
    console.log(requestDto);
    const dto = new CreateUserRequestDto();
    dto.email = requestDto.email;
    dto.password = requestDto.password;
    dto.firstName = requestDto.firstName;
    dto.lastName = requestDto.lastName;

    const user = await this.usersService.create(dto);

    return this.signIn(user);
  }

  async getProfile(userId: string): Promise<GetProfileResponseDto> {
    const { user } = await this.usersService.getUserById({ id: userId });
    return {
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }
}
