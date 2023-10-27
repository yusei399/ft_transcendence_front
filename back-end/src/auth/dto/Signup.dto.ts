import {IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';
import {AuthSignUpData} from 'src/shared/auth';

export class SignUpDto implements AuthSignUpData {
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
