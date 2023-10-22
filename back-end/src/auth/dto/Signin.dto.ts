import {IsNotEmpty, IsString} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
