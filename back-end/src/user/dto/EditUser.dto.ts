import {IsEmail, IsOptional, IsString, IsUrl} from 'class-validator';
import {UserEditUserData} from 'src/shared/HttpEndpoints/user';

export class EditUserDto implements UserEditUserData {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
