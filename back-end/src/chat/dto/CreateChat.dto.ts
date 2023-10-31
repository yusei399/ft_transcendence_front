import {IsOptional, IsString, IsUrl} from 'class-validator';
import {CreateChatData} from 'src/shared/HttpEndpoints/chat';

export class CreateChatDto implements CreateChatData {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  chatAvatarUrl?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
