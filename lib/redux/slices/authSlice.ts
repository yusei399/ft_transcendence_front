/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export type AuthErrorType = 'invalid_credentials' | 'user_already_exist' | 'enable_to_connect';

interface AuthSliceState {
  isSocketConnected?: boolean;
  authError?: AuthErrorType;
  jwt?: string;
}

const initialState: AuthSliceState = {
  isSocketConnected: false,
  authError: undefined,
  jwt: undefined,
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
    },
    connectSocket: state => {
      state.isSocketConnected = true;
    },
    disconnectSocket: state => {
      state.isSocketConnected = false;
    },
    setAuthError: (state, action: PayloadAction<AuthErrorType>) => {
      state.authError = action.payload;
    },
    clearAuthError: state => {
      state.authError = undefined;
    },
  },
});

export const {login, logout, connectSocket, disconnectSocket, setAuthError, clearAuthError} =
  authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export const jwtSelector = (state: RootState) => state.auth.jwt;
export const authErrorSelector = (state: RootState) => state.auth.authError;
export const isLoginSelector = (state: RootState) => state.auth.jwt !== undefined;
export default authSlice.reducer;
