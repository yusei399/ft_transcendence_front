import {IsOptional, IsString, IsUrl} from 'class-validator';

export class CreateChatRoomDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  chatAvatarUrl?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
