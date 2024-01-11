import {AppDispatch, setNotification} from '@/lib/redux';
import {backEndApi} from '@/lib/redux/api';
import {
  WsFriendConnection,
  WsFriendDisconnection,
  WsLeftFriend,
  WsNewFriend,
} from '@/shared/WsEvents/friend';
import {Socket} from 'socket.io-client';

export function setUpFriendEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsNewFriend.eventName, (message: WsNewFriend.eventMessageTemplate) => {
    const {userId, avatarUrl, nickname} = message.friend;

    dispatch(backEndApi.util.invalidateTags(['Friend']));

    dispatch(
      setNotification({
        title: 'New Friend',
        description: `${nickname} is now your friend`,
        status: 'success',
      }),
    );
  });

  socket.on(WsLeftFriend.eventName, (message: WsLeftFriend.eventMessageTemplate) => {
    const {userId, avatarUrl, nickname} = message.friend;

    dispatch(backEndApi.util.invalidateTags(['Friend']));

    dispatch(
      setNotification({
        title: 'Left Friend',
        description: `${nickname} left your friend list`,
        status: 'error',
      }),
    );
  });

  socket.on(WsFriendConnection.eventName, (message: WsFriendConnection.eventMessageTemplate) => {
    const {userId, avatarUrl, nickname} = message.friend;

    dispatch(backEndApi.util.invalidateTags(['Friend']));

    dispatch(
      setNotification({
        title: 'Friend Connection',
        description: `${nickname} is now online`,
        status: 'info',
      }),
    );
  });

  socket.on(
    WsFriendDisconnection.eventName,
    (message: WsFriendDisconnection.eventMessageTemplate) => {
      const {userId, avatarUrl, nickname} = message.friend;
      dispatch(backEndApi.util.invalidateTags(['Friend']));

      dispatch(
        setNotification({
          title: 'Friend Disconnection',
          description: `User ${nickname} is now offline`,
          status: 'info',
        }),
      );
    },
  );
}
