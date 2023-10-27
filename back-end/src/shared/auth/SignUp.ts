/****************POST****************/
export const AuthSignUpEndPoint = 'signup';
export interface AuthSignUpData {
  nickname: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

export interface AuthSignUpResponse {
  profile: {
    profileId: number;
    nickname: string;
    avatarUrl: string;
  };
  userId: number;
  email: string;
}
