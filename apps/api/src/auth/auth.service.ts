import { SignUpRequestDto, SignUpResponseDto } from '@shotly/contracts/auth';
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

  async signUp(request: SignUpRequestDto): Promise<SignUpResponseDto> {
    console.log(request);
    const dto = new CreateUserRequestDto();
    dto.email = request.email;
    dto.password = request.password;
    dto.firstName = request.firstName;
    dto.lastName = request.lastName;

    const user = await this.usersService.create(dto);

    return this.signIn(user);
  }
}
