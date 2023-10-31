import {UserPublicProfile} from '../../base_interfaces';

/****************POST****************/
export const AuthSignUpEndPoint = 'signup';
export interface AuthSignUpData {
  nickname: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export class AuthSignUpResponse implements UserPublicProfile {
  userId: number;
  nickname: string;
  avatarUrl: string;
}
