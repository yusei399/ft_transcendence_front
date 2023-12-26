import {AppDispatch, setNotification} from '@/lib/redux';
import {WsChatJoin, WsChatLeave, WsNewMessage} from '@/shared/WsEvents/chat';
import {Socket} from 'socket.io-client';

export function setUpChatEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsChatJoin.eventName, (message: WsChatJoin.eventMessageTemplate) => {
    const {userId, chatId} = message;
    dispatch(
      setNotification({
        title: 'Chat',
        description: `User ${userId} joined chat ${chatId}`,
        status: 'info',
      }),
    );
  });

  socket.on(WsChatLeave.eventName, (message: WsChatLeave.eventMessageTemplate) => {
    const {userId, chatId} = message;
    dispatch(
      setNotification({
        title: 'Chat',
        description: `User ${userId} left chat ${chatId}`,
        status: 'warning',
      }),
    );
  });

  socket.on(WsNewMessage.eventName, (message: WsNewMessage.eventMessageTemplate) => {
    const {messageId, senderId, chatId, messageContent} = message;
    dispatch(
      setNotification({
        title: 'Chat',
        description: `User ${senderId} sent message ${messageId} to chat ${chatId}: ${messageContent}`,
        status: 'success',
      }),
    );
  });
}
