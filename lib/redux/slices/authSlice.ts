/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface AuthSliceState {
  isSocketConnected: boolean;
  jwt?: string;
  auth2FACode?: string;
  isSignUp?: boolean;
  userId?: number;
}

const initialState: AuthSliceState = {
  isSocketConnected: false,
  jwt: undefined,
  isSignUp: undefined,
  auth2FACode: undefined,
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
    login: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    logout: state => {
      state.jwt = undefined;
      state.isSocketConnected = false;
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
    connectSocket: state => {
      state.isSocketConnected = true;
    },
    disconnectSocket: state => {
      state.isSocketConnected = false;
    },
  },
});

export const {login, logout, set2fa, clear2fa, connectSocket, disconnectSocket} = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export const jwtSelector = (state: RootState) => state.auth.jwt;
export const is2FANeededSelector = (state: RootState) =>
  state.auth.jwt === undefined && state.auth.auth2FACode !== undefined;
export const isLoginSelector = (state: RootState) => state.auth.jwt !== undefined;
export default authSlice.reducer;
