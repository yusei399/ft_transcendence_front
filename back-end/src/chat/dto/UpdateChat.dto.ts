import {Role} from '@prisma/client';
import {UpdateChatData} from 'src/shared/HttpEndpoints/chat';

export class UpdateChatDto implements UpdateChatData {
  name?: string;
  password?: string;
  chatAvatarUrl?: string;
  participants?: {
    userId: number;
    targetRole?: Role;
    muteUntil?: Date;
    blockUntil?: Date;
    kick?: boolean;
  }[];
}
