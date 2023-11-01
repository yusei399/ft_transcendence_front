import {IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';
import {CreateChatData} from 'src/shared/HttpEndpoints/chat';

export class CreateChatDto implements CreateChatData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  chatAvatarUrl?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;
}
