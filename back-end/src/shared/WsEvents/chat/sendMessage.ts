import {ChatEventName} from '../../base_types';

export const sendMessageEventName: ChatEventName = 'newMessage';

export interface SendMessageData {
  userId: number;
  chatId: number;
  messageContent: string;
}

export interface OnSendMessageEvent {
  messageId: number;
  userId: number;
  chatId: number;
  messageContent: string;
}
