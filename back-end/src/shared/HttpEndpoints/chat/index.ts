import {CreateChatEndPoint} from './createChat';
import {ChatGetAllMessagesEndPoint} from './getAllMessage';
import {GetChatInfoEndPoint} from './getChatInfo';
import {JoinChatEndPoint} from './joinChat';
import {LeaveChatEndPoint} from './leaveChat';
import {UpdateChatEndPoint} from './updateChat';

export * from './getAllMessage';
export * from './getChatInfo';
export * from './createChat';
export * from './joinChat';
export * from './leaveChat';
export * from './updateChat';

export const ChatEndPointBase = 'chats';
export const ChatEndPoints = {
  getAllMessages: `${ChatEndPointBase}/${ChatGetAllMessagesEndPoint}`,
  getChatInfo: `${ChatEndPointBase}/${GetChatInfoEndPoint}`,
  createChatInfo: `${ChatEndPointBase}/${CreateChatEndPoint}`,
  joinChat: function (chatId: number) {
    `${ChatEndPointBase}/${JoinChatEndPoint(chatId)}`;
  },
  leaveChat: function (chatId: number) {
    `${ChatEndPointBase}/${LeaveChatEndPoint(chatId)}`;
  },
  updateChat: function (chatId: number) {
    `${ChatEndPointBase}/${UpdateChatEndPoint(chatId)}`;
  },
};
