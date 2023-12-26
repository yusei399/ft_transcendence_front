import {HttpUser} from '@/shared/HttpEndpoints/';
import {backEndApi} from './api';
import {createMutation, createQuery} from './utils';

const userApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    allUsers: createQuery(build, HttpUser.allUsers.requestSender),
    getMe: createQuery(build, HttpUser.getMe.requestSender),
    editMe: createMutation(build, HttpUser.editMe.requestSender),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {useAllUsersQuery, useGetMeQuery, useEditMeMutation} = userApi;
