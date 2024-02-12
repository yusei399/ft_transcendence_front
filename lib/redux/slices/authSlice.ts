/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {JwtData} from '@/shared/HttpEndpoints/types';

interface AuthSliceState {
  authToken?: JwtData;
  refreshToken?: JwtData;
  auth2FACode?: string;
  isSignUp?: boolean;
  userId?: number;
}

export type SetTokensPayload = {
  authToken: JwtData;
  refreshToken: JwtData;
  userId: number;
};

export type RefreshPayload = {
  authToken: JwtData;
  refreshToken: JwtData;
};

const initialState: AuthSliceState = {
  authToken: undefined,
  refreshToken: undefined,
  auth2FACode: undefined,
  isSignUp: undefined,
  userId: undefined,
};

type set2FAPayload = {
  auth2FACode: string;
  userId: number;
  isSignUp: boolean;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<SetTokensPayload>) => {
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
    },
    refresh: (state, action: PayloadAction<RefreshPayload>) => {
      state.authToken = action.payload.authToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: state => {
      state.authToken = undefined;
      state.refreshToken = undefined;
      state.userId = undefined;
      state.auth2FACode = undefined;
      state.isSignUp = undefined;
    },
    set2fa: (state, action: PayloadAction<set2FAPayload>) => {
      state.auth2FACode = action.payload.auth2FACode;
      state.userId = action.payload.userId;
      state.isSignUp = action.payload.isSignUp;
    },
    clear2fa: state => {
      state.auth2FACode = undefined;
      state.isSignUp = undefined;
    },
  },
});

export const {login, logout, refresh, set2fa, clear2fa} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export const authTokenSelector = (state: RootState) => state.auth.authToken;
export const refreshTokenSelector = (state: RootState) => state.auth.refreshToken;
export const is2FANeededSelector = (state: RootState) =>
  state.auth.authToken === undefined && state.auth.auth2FACode !== undefined;
export const isLoginSelector = (state: RootState) => state.auth.authToken !== undefined;
export const userIdSelector = (state: RootState) => state.auth.userId;
export default authSlice.reducer;
