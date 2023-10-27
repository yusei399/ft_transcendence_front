/****************GET****************/
export const UserMeEndPoint = 'me';

export interface UserMeUserResponse {
  profile: {
    profileId: number;
    nickname: string;
    avatarUrl: string;
  };
  userId: number;
  email: string;
}
