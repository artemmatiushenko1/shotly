export class CreateUserRequestDto {
  email: string = '';
  lastName: string = '';
  firstName: string = '';
  password: string = '';
}

export class CreateUserResponseDto {
  id: string = '';
  email: string = '';
  lastName: string = '';
  firstName: string = '';
}
