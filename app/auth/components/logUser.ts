import {AppDispatch, clear2fa, login, setNotification} from '@/lib/redux';
import {ErrorType} from '@/lib/redux/api';
import {SocketService} from '@/services/websocket/socketService';

export const logUserIn = (dispatch: AppDispatch, authToken: string, withSignUp: boolean) => {
  dispatch(login(authToken));
  SocketService.initializeSocket(dispatch, authToken);
  dispatch(clear2fa());
  if (withSignUp) {
    dispatch(
      setNotification({
        title: 'Sign up success',
        description: 'Account created and logged in',
        status: 'success',
      }),
    );
  } else {
    dispatch(
      setNotification({
        title: 'Sign in success',
        description: 'You are now logged in',
        status: 'success',
      }),
    );
  }
};

export const setLogInError = (dispatch: AppDispatch, error: ErrorType) => {
  let errorMsg: string;
  switch (error.status) {
    case 401:
      errorMsg = 'invalid credentials';
      break;
    case 409:
      errorMsg = 'username already taken';
      break;
    default:
      errorMsg = error.data;
      break;
  }

  dispatch(
    setNotification({
      title: 'Auth error',
      description: errorMsg,
      status: 'error',
    }),
  );
};

export const auth2FAError = (dispatch: AppDispatch, error: ErrorType) => {
  let errorMsg: string;
  switch (error.status) {
    case 403:
      errorMsg = 'invalid 2FA confirmation code';
      break;
    default:
      errorMsg = error.data;
      break;
  }

  dispatch(
    setNotification({
      title: 'Auth error',
      description: errorMsg,
      status: 'error',
    }),
  );
};
