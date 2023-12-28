import {AppDispatch, setNotification} from '@/lib/redux';
import {WsBallPosition, WsGameJoin, WsGameLeave, WsNewPlayerMove} from '@/shared/WsEvents/game/';
import {Socket} from 'socket.io-client';

export function setUpGameEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsBallPosition.eventName, (message: WsBallPosition.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsNewPlayerMove.eventName, (message: WsNewPlayerMove.eventMessageTemplate) => {
    console.log(message);
  });

  socket.on(WsGameJoin.eventName, (message: WsGameJoin.eventMessageTemplate) => {
    const {userId, gameId} = message;
    dispatch(
      setNotification({
        title: 'Game',
        description: `User ${userId} joined game ${gameId}`,
        status: 'info',
      }),
    );
  });

  socket.on(WsGameLeave.eventName, (message: WsGameLeave.eventMessageTemplate) => {
    const {userId, gameId} = message;
    dispatch(
      setNotification({
        title: 'Game',
        description: `User ${userId} left game ${gameId}`,
        status: 'info',
      }),
    );
  });
}
