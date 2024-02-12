import {HttpUser} from '@/shared/HttpEndpoints';
import {backEndApi} from './api';
import {createMutation, createQuery} from './utils';

const userApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    allUsers: createQuery(build, HttpUser.allUsers.requestSender, ['OtherUsers']),
    getUser: createQuery(build, HttpUser.getUser.requestSender, ['OtherUsers', 'Friend']),
    getMe: createQuery(build, HttpUser.getMe.requestSender, ['Auth', 'User']),
    editMe: createMutation(build, HttpUser.editMe.requestSender, ['User']),
    blockUser: createMutation(build, HttpUser.blockUser.requestSender, ['OtherUsers']),
    unblockUser: createMutation(build, HttpUser.unblockUser.requestSender, ['OtherUsers']),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useAllUsersQuery,
  useGetUserQuery,
  useGetMeQuery,
  useEditMeMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} = userApi;
