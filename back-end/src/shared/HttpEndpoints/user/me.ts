import { UserPublicProfile } from "src/shared/base_interfaces";

/****************GET****************/
export const UserMeEndPoint = 'me';

export class UserMeUserResponse implements UserPublicProfile {
  userId: number;
  nickname: string;
  avatarUrl: string;
}
