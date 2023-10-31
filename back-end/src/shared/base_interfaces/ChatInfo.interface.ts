import {UserPublicProfile} from './UserPublicInfo.interface';

export type Role = 'ADMIN' | 'MEMBER';

export interface ChatInfo {
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
