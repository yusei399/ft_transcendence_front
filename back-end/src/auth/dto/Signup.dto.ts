import {IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;
}
