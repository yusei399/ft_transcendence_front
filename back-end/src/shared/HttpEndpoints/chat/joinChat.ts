import {ChatInfo, Role, UserPublicProfile} from '../../base_interfaces';

/****************POST****************/
export const JoinChatEndPoint = (chatId: number) => {
  `/join/${chatId}`;
};
export const JoinChatParam = 'chatId';
export const JoinChatEndPoint_NEST = `/join/:${JoinChatParam}`;

export interface JoinChatData {
  password?: string;
}

export interface JoinChatRespone extends ChatInfo {
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
