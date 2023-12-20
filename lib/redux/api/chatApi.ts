import {HttpChat} from '@/shared/HttpEndpoints/';
import {backEndApiSlice} from './apiSlice';
import {createMutation, createQuery} from './utils';

const chatApi = backEndApiSlice.injectEndpoints({
  endpoints: build => ({
    getAllChats: createQuery(build, HttpChat.getAll.requestSender),
    getChatInfo: createQuery(build, HttpChat.getInfo.requestSender),
    getChatMessages: createQuery(build, HttpChat.getMessages.requestSender),
    createChat: createMutation(build, HttpChat.create.requestSender),
    joinChat: createMutation(build, HttpChat.join.requestSender),
    leaveChat: createMutation(build, HttpChat.leave.requestSender),
    updateChat: createMutation(build, HttpChat.update.requestSender),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useGetAllChatsQuery,
  useGetChatInfoQuery,
  useGetChatMessagesQuery,
  useCreateChatMutation,
  useJoinChatMutation,
  useLeaveChatMutation,
  useUpdateChatMutation,
} = chatApi;
