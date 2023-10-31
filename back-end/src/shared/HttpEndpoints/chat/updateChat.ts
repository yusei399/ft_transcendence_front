import {ChatInfo, Role, UserPublicProfile} from '../../base_interfaces';

/****************POST****************/
export const UpdateChatEndPoint = (chatId: number) => {
  `/Update/${chatId}`;
};
export const UpdateChatParam = 'chatId';
export const UpdateChatEndPoint_NEST = `/Update/:${UpdateChatParam}`;

export interface UpdateChatData {
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

export interface UpdateChatRespone extends ChatInfo {
  chatId: number;
  name: string;
  chatAvatarUrl: string;
  hasPassword: boolean;
  participants: {
    userProfile: UserPublicProfile;
    role: Role;
    mutedUntil?: Date;
    blockedUntil?: Date;
    hasLeaved: boolean;
  }[];
}
