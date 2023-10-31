import {UserPublicProfile, query, Role} from '../../base_interfaces';

/****************GET****************/
export const ChatGetAllMessagesEndPoint = 'allMessages';
export const ChatGetAllMessagesQuery: Partial<query<number>> = {key: 'roomId'};

export interface GetAllMessageResponse {
  participant: {
    userProfile: UserPublicProfile;
    role: Role;
    mutedUntil?: Date;
    blockedUntil?: Date;
    hasLeaved: boolean;
  }[];
  messages: {
    userId: number;
    messageId: number;
    createdAt: Date;
    messageContent: string;
  }[];
}
