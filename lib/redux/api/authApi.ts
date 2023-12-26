import {HttpAuth} from '@/shared/HttpEndpoints/';
import {backEndApi} from './api';
import {createMutation} from './utils';

const authApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    signIn: createMutation(build, HttpAuth.SignIn.requestSender),
    signUp: createMutation(build, HttpAuth.SignUp.requestSender),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {useSignInMutation, useSignUpMutation} = authApi;
