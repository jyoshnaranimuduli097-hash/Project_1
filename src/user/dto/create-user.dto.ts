import { IsString, IsEmail, IsInt } from 'class-validator';

export class createUserDto {
  @IsString()
  userName: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsInt()
  age: number;
}
