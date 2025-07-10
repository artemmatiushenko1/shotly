import { User } from '@shotly/contracts/users';

export class GetUserByEmailRequestDto {
  email: string = '';
}

export class GetUserByEmailResponseDto {
  user: User | null = null;
}
