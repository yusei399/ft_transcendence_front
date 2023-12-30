import {AppDispatch, clear2fa, login} from '@/lib/redux';
import {setNotification, Notification} from '@/lib/redux/slices/notificationSlice';
import {SocketService} from '@/services/websocket/socketService';

export const logUserIn = (dispatch: AppDispatch, authToken: string, withSignUp: boolean) => {
  dispatch(login(authToken));
  SocketService.initializeSocket(dispatch, authToken);
  dispatch(clear2fa());

  let title: Notification['title'];
  let description: Notification['description'];
  const status: Notification['status'] = 'success';
  if (withSignUp) {
    title = 'Sign up success';
    description = 'Account created and logged in';
  } else {
    title = 'Sign in success';
    description = 'You are now logged in';
  }
  dispatch(setNotification({title, description, status}));
};

type LogErrorMessages =
  | 'Invalid credential'
  | 'Invalid 2FA code'
  | 'Nickname already taken'
  | '42 OAuth error: Unauthorized'
  | 'Something went wrong';
export const setLogInError = (dispatch: AppDispatch, errorMsg: LogErrorMessages) => {
  const title: Notification['title'] = 'Auth error';
  const description: Notification['description'] = errorMsg;
  const status: Notification['status'] = 'error';

  dispatch(setNotification({title, description, status}));
};
