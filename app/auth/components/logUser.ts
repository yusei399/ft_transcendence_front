import {AppDispatch, SetTokensPayload, clear2fa, login} from '@/lib/redux';
import {setNotification, Notification} from '@/lib/redux/slices/notificationSlice';

export const logUserIn = (
  dispatch: AppDispatch,
  payload: SetTokensPayload,
  withSignUp: boolean,
): void => {
  dispatch(login(payload));
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
export const setLogInError = (dispatch: AppDispatch, errorMsg: LogErrorMessages): void => {
  const title: Notification['title'] = 'Auth error';
  const description: Notification['description'] = errorMsg;
  const status: Notification['status'] = 'error';

  dispatch(setNotification({title, description, status}));
};
