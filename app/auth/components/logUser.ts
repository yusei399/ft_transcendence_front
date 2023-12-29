import {AppDispatch, clear2fa, login, setNotification} from '@/lib/redux';
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

type LogErrorMessages =
  | 'Invalid credential'
  | 'Invalid 2FA code'
  | 'Nickname already taken'
  | '42 OAuth error: Unauthorized'
  | 'Something went wrong';
export const setLogInError = (dispatch: AppDispatch, errorMsg: LogErrorMessages) => {
  dispatch(
    setNotification({
      title: 'Auth error',
      description: errorMsg,
      status: 'error',
    }),
  );
};
