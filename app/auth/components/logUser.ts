import {AppDispatch, AuthErrorType, setAuthError, login} from '@/lib/redux';
import {ErrorType} from '@/lib/redux/api';
import {SocketService} from '@/services/websocket/socketService';

export const logUserIn = (dispatch: AppDispatch, authToken: string) => {
  dispatch(login(authToken));
  SocketService.initializeSocket(dispatch, authToken);
};

export const setLogInError = (dispatch: AppDispatch, error: ErrorType) => {
  let errorMsg: AuthErrorType;
  switch (error.status) {
    case 401:
      errorMsg = 'invalid_credentials';
      break;
    case 409:
      errorMsg = 'user_already_exist';
      break;
    default:
      errorMsg = 'enable_to_connect';
      break;
  }
  dispatch(setAuthError(errorMsg));
};
