export class UserDto {
  username: string;
  name: string;
  email: string;
  birthDate: Date;
  password: string;
}

export class GetUserDto {
  id: string;
  username: string;
  name: string;
  email: string;
  birthDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDeleteUserDto {
  id: string;
  username: string;
}
