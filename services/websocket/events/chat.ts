import {AppDispatch, refreshChat, setNotification} from '@/lib/redux';
import {WsChatJoin, WsChatLeave, WsNewMessage} from '@/shared/WsEvents/chat/';
import {Socket} from 'socket.io-client';
import {SocketService} from '../socketService';

export function setUpChatEvents(socket: Socket, dispatch: AppDispatch, userId: number): void {
  socket.on(WsChatJoin.eventName, (message: WsChatJoin.eventMessageTemplate) => {
    const {chat, user} = message;
    dispatch(
      setNotification({
        title: 'Chat - User joined',
        description: `User ${user.nickname} joined chat ${chat.chatName}`,
        status: 'info',
      }),
    );
  });

  socket.on(WsChatLeave.eventName, (message: WsChatLeave.eventMessageTemplate) => {
    const {chat, user} = message;
    dispatch(
      setNotification({
        title: 'Chat - User left',
        description: `User ${user.nickname} left chat ${chat.chatName}`,
        status: 'warning',
      }),
    );
  });

  socket.on(WsNewMessage.eventName, (message: WsNewMessage.eventMessageTemplate) => {
    const {
      chat: {chatId, chatName},
      message: {messageContent},
      sender: {nickname, userId: senderId},
    } = message;

    dispatch(refreshChat({chatId, reason: 'newMessage'}));

    if (userId === senderId) return;

    dispatch(
      setNotification({
        title: 'Chat - New message',
        description: `[${chatName}] from ${nickname}: ${messageContent}`,
        status: 'success',
      }),
    );
  });
}
