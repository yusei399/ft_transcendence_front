import {AppDispatch} from '@/lib/redux';
import {WsChatJoin, WsChatLeave, WsNewMessage} from '@/shared/WsEvents/chat';
import {Socket} from 'socket.io-client';

export function setUpChatEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsChatJoin.eventName, (message: WsChatJoin.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsChatLeave.eventName, (message: WsChatLeave.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsNewMessage.eventName, (message: WsNewMessage.eventMessageTemplate) => {
    console.log(message);
  });
}
