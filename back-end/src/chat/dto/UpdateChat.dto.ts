import {Role} from '@prisma/client';
import {IsArray, IsNotEmpty, IsOptional} from 'class-validator';
import {UpdateChatData} from 'src/shared/HttpEndpoints/chat';

export class UpdateChatDto implements UpdateChatData {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  chatAvatarUrl?: string;

  @IsOptional()
  @IsArray()
  participants?: {
    userId: number;
    targetRole?: Role;
    muteUntil?: Date;
    blockUntil?: Date;
    kick?: boolean;
  }[];
}
