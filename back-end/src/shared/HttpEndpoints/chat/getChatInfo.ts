import {ChatInfo, Role, UserPublicProfile, query} from '../../base_interfaces';

/****************GET****************/
export const GetChatInfoEndPoint = '';
export const GetChatInfoQuery: Partial<query<number>> = {key: 'roomId'};

export interface GetChatInfoResponse extends ChatInfo {
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
