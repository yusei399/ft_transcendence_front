import {AppDispatch} from '@/lib/redux';
import {WsBallPosition, WsGameJoin, WsGameLeave, WsNewPlayerMove} from '@/shared/WsEvents/game';
import {Socket} from 'socket.io-client';

export function setUpGameEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsBallPosition.eventName, (message: WsBallPosition.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsNewPlayerMove.eventName, (message: WsNewPlayerMove.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsGameJoin.eventName, (message: WsGameJoin.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsGameLeave.eventName, (message: WsGameLeave.eventMessageTemplate) => {
    console.log(message);
  });
}
