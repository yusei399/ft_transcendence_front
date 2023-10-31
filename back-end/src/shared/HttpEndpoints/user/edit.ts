import {UserPublicProfile} from '../../base_interfaces';

/****************PATCH****************/
export const UserEditEndPoint = 'edit';
export interface UserEditUserData {
  email?: string;
  nickname?: string;
  avatarUrl?: string;
  password?: string;
}

export class UserEditUserResponse implements UserPublicProfile {
  userId: number;
  nickname: string;
  avatarUrl: string;
}
