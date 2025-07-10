import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequestDto, SignUpResponseDto } from './dto/sign-up.dto';
import { CreateUserRequestDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUserDto | null> {
    const { user } = await this.usersService.getUserByEmail({ email });

    if (!user) return null;

    const hashedPassword = user.password;
    const isPasswordsMatch = await bcrypt.compare(password, hashedPassword);

    return isPasswordsMatch ? user : null;
  }

  signIn(user: AuthenticatedUserDto) {
    const payload = { sub: user.id };

    // TODO: attach access token to http only cookie
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(request: SignUpRequestDto): Promise<SignUpResponseDto> {
    const dto = new CreateUserRequestDto();
    dto.email = request.email;
    dto.password = request.password;
    dto.firstName = request.firstName;
    dto.lastName = request.lastName;

    const user = await this.usersService.create(dto);

    return this.signIn(user);
  }
}
