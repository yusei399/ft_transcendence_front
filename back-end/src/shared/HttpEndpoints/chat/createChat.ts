import {UserPublicProfile, ChatInfo, Role} from 'src/shared/base_interfaces';

/****************POST****************/
export const CreateChatEndPoint = 'create';
export interface CreateChatData {
  name: string;
  chatAvatarUrl?: string;
  password?: string;
}

export interface CreateChatResponse extends ChatInfo {
  chatId: number;
  name: string;
  chatAvatarUrl?: string;
  hasPassword: boolean;
  participants: {
    userProfile: UserPublicProfile;
    role: Role;
    mutedUntil?: Date;
    blockedUntil?: Date;
    hasLeaved: boolean;
  }[];
}
