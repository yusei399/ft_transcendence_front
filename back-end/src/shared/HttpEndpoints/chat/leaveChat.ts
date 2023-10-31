import {ChatInfo, Role, UserPublicProfile} from '../../base_interfaces';

/****************POST****************/
export const LeaveChatEndPoint = (chatId: number) => {
  `/leave/${chatId}`;
};
export const LeaveChatParam = 'chatId';
export const LeaveChatEndPoint_NEST = `/leave/:${LeaveChatParam}`;

export interface LeaveChatData {}

export interface LeaveChatRespone extends ChatInfo {
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
