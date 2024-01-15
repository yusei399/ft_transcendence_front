import {AppDispatch, setNotification} from '@/lib/redux';
import {backEndApi} from '@/lib/redux/api';
import {WsUserConnection, WsUserProfilUpdate, WsUserStatusChange} from '@/shared/WsEvents/user';
import {WsUserBlocking} from '@/shared/WsEvents/user/userBlocking';
import {Socket} from 'socket.io-client';

export function setUpUserEvents(socket: Socket, dispatch: AppDispatch, userId: number): void {
  socket.on(WsUserConnection.eventName, (message: WsUserConnection.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['OtherUsers']));
  });

  socket.on(WsUserProfilUpdate.eventName, (message: WsUserProfilUpdate.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['OtherUsers']));
  });

  socket.on(WsUserBlocking.eventName, (message: WsUserBlocking.eventMessageTemplate) => {
    dispatch(backEndApi.util.invalidateTags(['OtherUsers']));

    const {user, type} = message;
    if (type === 'block') {
      dispatch(
        setNotification({
          status: 'warning',
          title: `You have been blocked by ${user.nickname}`,
          description: `You will not be able to see ${user.nickname} anymore.`,
        }),
      );
    } else {
      dispatch(
        setNotification({
          status: 'success',
          title: `You have been unblocked by ${user.nickname}`,
          description: `You can now see ${user.nickname} again.`,
        }),
      );
    }
  });

  socket.on(WsUserStatusChange.eventName, (message: WsUserStatusChange.eventMessageTemplate) => {
    if (message.userId === userId) return;
    dispatch(backEndApi.util.invalidateTags(['OtherUsers']));
  });
}
