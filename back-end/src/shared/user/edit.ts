/****************PATCH****************/
export const UserEditEndPoint = 'edit';
export interface UserEditUserData {
  email?: string;
  nickname?: string;
  avatarUrl?: string;
  password?: string;
}

export interface UserEditUserResponse {
  profile: {
    profileId: number;
    nickname: string;
    avatarUrl: string;
  };
  userId: number;
  email: string;
}
