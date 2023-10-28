/****************POST****************/
export const AuthSignInEndPoint = 'signin';
export interface AuthSignInData {
  nickname: string;
  password: string;
}

export interface AuthSignInResponse {
  authToken: string;
}
