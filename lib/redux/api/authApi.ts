import {HttpAuth} from '@/shared/HttpEndpoints';
import {backEndApi} from './api';
import {createMutation} from './utils';

const authApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    signIn: createMutation(build, HttpAuth.SignIn.requestSender, ['User']),
    signUp: createMutation(build, HttpAuth.SignUp.requestSender, ['User']),
    verify42: createMutation(build, HttpAuth.Auth42VerifyCode.requestSender, ['User']),
    verify2FA: createMutation(build, HttpAuth.Auth2FA.requestSender, ['User']),
    resend2FA: createMutation(build, HttpAuth.Resend2FA.requestSender, ['User']),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerify2FAMutation,
  useResend2FAMutation,
  useVerify42Mutation,
} = authApi;
