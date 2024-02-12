import {HttpAuth} from '@/shared/HttpEndpoints';
import {backEndApi} from './api';
import {createMutation} from './utils';

const authApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    signIn: createMutation(build, HttpAuth.SignIn.requestSender, ['Auth']),
    signUp: createMutation(build, HttpAuth.SignUp.requestSender, ['Auth']),
    verify42: createMutation(build, HttpAuth.Auth42VerifyCode.requestSender, ['Auth']),
    verify2FA: createMutation(build, HttpAuth.Auth2FA.requestSender, ['Auth']),
    resend2FA: createMutation(build, HttpAuth.Resend2FA.requestSender, ['Auth']),
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
