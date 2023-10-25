export interface GetUserBy42Id {
  user42Id: number;
}

export interface GetUserByEmailPassword {
  user42Id: undefined;
  email: string;
  hashedPassword: string;
}

export interface GetUserById {
  userId: number;
}

export interface GetUserByNickname {
  nickname: string;
}

export type GetUserTemplate = GetUserBy42Id | GetUserByEmailPassword | GetUserById | GetUserByNickname;
