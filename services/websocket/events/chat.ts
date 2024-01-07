import {AppDispatch, setNotification} from '@/lib/redux';
import {WsChatJoin, WsChatLeave, WsNewMessage} from '@/shared/WsEvents/chat/';
import {Socket} from 'socket.io-client';

export function setUpChatEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsChatJoin.eventName, (message: WsChatJoin.eventMessageTemplate) => {
    const {chat, user} = message;
    dispatch(
      setNotification({
        title: 'Chat',
        description: `User ${user.nickname} joined chat ${chat.chatName}`,
        status: 'info',
      }),
    );
  });

  socket.on(WsChatLeave.eventName, (message: WsChatLeave.eventMessageTemplate) => {
    const {chat, user} = message;
    dispatch(
      setNotification({
        title: 'Chat',
        description: `User ${user.nickname} left chat ${chat.chatName}`,
        status: 'warning',
      }),
    );
  });

  socket.on(WsNewMessage.eventName, (message: WsNewMessage.eventMessageTemplate) => {
    const {
      chat: {chatId},
      message: {messageId, messageContent},
      sender: {userId},
    } = message;
    dispatch(
      setNotification({
        title: 'Chat',
        description: `User ${userId} sent message ${messageId} to chat ${chatId}:
         ${messageContent}`,
        status: 'success',
      }),
    );
  });
}
