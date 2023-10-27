import {Auth42EndPoint} from './42';
import {AuthSignInEndPoint} from './SignIn';
import {AuthSignUpEndPoint} from './SignUp';

export * from './SignUp';
export * from './SignIn';
export * from './42';

export const AuthEndPointBase = 'auth';
export const AuthEndPoints = {
  _42: `${AuthEndPointBase}/${Auth42EndPoint}`,
  signUp: `${AuthEndPointBase}/${AuthSignUpEndPoint}`,
  signIn: `${AuthEndPointBase}/${AuthSignInEndPoint}`,
};
