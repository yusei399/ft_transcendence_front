import {HttpAuth} from '@/shared/HttpEndpoints/';
import {backEndApiSlice} from './apiSlice';
import {createMutation} from './utils';

const authApi = backEndApiSlice.injectEndpoints({
  endpoints: build => ({
    signIn: createMutation(build, HttpAuth.SignIn.requestSender),
    signUp: createMutation(build, HttpAuth.SignUp.requestSender),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {useSignInMutation, useSignUpMutation} = authApi;
