import {HttpFriend} from '@/shared/HttpEndpoints';
import {backEndApi} from './api';
import {createMutation, createQuery} from './utils';

const friendApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    getFriend: createQuery(build, HttpFriend.getFriendLists.requestSender, ['Friend']),
    removeFriend: createMutation(build, HttpFriend.removeFriend.requestSender, ['Friend']),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {useGetFriendQuery, useRemoveFriendMutation} = friendApi;
