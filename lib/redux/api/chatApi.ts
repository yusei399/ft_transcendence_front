import {HttpChat} from '@/shared/HttpEndpoints';
import {backEndApi} from './api';
import {createMutation, createQuery} from './utils';

const chatApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    getAllChats: createQuery(build, HttpChat.getAll.requestSender, ['Chat']),
    getChatInfo: createQuery(build, HttpChat.getInfo.requestSender, ['Chat']),
    createChat: createMutation(build, HttpChat.create.requestSender, ['Chat']),
    joinChat: createMutation(build, HttpChat.join.requestSender, ['Chat']),
    leaveChat: createMutation(build, HttpChat.leave.requestSender, ['Chat']),
    updateChat: createMutation(build, HttpChat.update.requestSender, ['Chat']),
    updateChatMember: createMutation(build, HttpChat.updateParticipation.requestSender, ['Chat']),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useGetAllChatsQuery,
  useGetChatInfoQuery,
  useCreateChatMutation,
  useJoinChatMutation,
  useLeaveChatMutation,
  useUpdateChatMutation,
  useUpdateChatMemberMutation,
} = chatApi;
