import {AppDispatch, connectSocket, disconnectSocket} from '@/lib/redux';
import {WsConnection, WsDisconnection} from '@/shared/WsEvents/default';
import {Socket} from 'socket.io-client';

export function setUpDefaultEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsConnection.eventName, (message: WsConnection.eventMessageTemplate) => {
    dispatch(connectSocket());
  });

  socket.on(WsDisconnection.eventName, (message: WsDisconnection.eventMessageTemplate) => {
    socket.close();
    dispatch(disconnectSocket());
  });
}
