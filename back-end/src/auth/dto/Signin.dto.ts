import {IsNotEmpty, IsString} from 'class-validator';
import {AuthSignInData} from 'src/shared/HttpEndpoints/auth';

export class SignInDto implements AuthSignInData {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
