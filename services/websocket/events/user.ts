import {AppDispatch} from '@/lib/redux';
import {backEndApi} from '@/lib/redux/api';
import {WsUserConnection, WsUserProfilUpdate} from '@/shared/WsEvents/user';
import {Socket} from 'socket.io-client';

export function setUpUserEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsUserConnection.eventName, (message: WsUserConnection.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['OtherUsers']));
  });

  socket.on(WsUserProfilUpdate.eventName, (message: WsUserProfilUpdate.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['OtherUsers']));
  });
}
