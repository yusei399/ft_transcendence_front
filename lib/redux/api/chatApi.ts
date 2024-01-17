import {HttpChat} from '@/shared/HttpEndpoints';
import {backEndApi} from './api';
import {createMutation, createQuery} from './utils';

const chatApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    getAllChats: createQuery(build, HttpChat.getAll.requestSender, ['ChatOverView']),
    getAllDirectMessage: createQuery(build, HttpChat.getDirectMessages.requestSender, [
      'OtherUsers',
      'DirectMessage',
    ]),
    getChatInfo: createQuery(build, HttpChat.getInfo.requestSender, ['ChatOverView', 'ChatInfo']),
    createChat: createMutation(build, HttpChat.create.requestSender, []),
    joinChat: createMutation(build, HttpChat.join.requestSender, ['ChatInfo']),
    leaveChat: createMutation(build, HttpChat.leave.requestSender, ['ChatInfo']),
    updateChat: createMutation(build, HttpChat.update.requestSender, ['ChatOverView']),
    updateChatMember: createMutation(build, HttpChat.updateParticipation.requestSender, [
      'ChatInfo',
    ]),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useGetAllChatsQuery,
  useGetAllDirectMessageQuery,
  useGetChatInfoQuery,
  useCreateChatMutation,
  useJoinChatMutation,
  useLeaveChatMutation,
  useUpdateChatMutation,
  useUpdateChatMemberMutation,
} = chatApi;
