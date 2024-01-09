import {AppDispatch, setNotification} from '@/lib/redux';
import {refreshInvitation} from '@/lib/redux/slices/invitationSlice';
import {
  WsFriendConnection,
  WsFriendDisconnection,
  WsLeftFriend,
  WsNewFriend,
} from '@/shared/WsEvents/friend';
import {Socket} from 'socket.io-client';

export function setUpFriendEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(WsNewFriend.eventName, (message: WsNewFriend.eventMessageTemplate) => {
    const {friendId} = message;

    dispatch(refreshInvitation('FRIEND'));

    dispatch(
      setNotification({
        title: 'New Friend',
        description: `User ${friendId} is now your friend`,
        status: 'success',
      }),
    );
  });

  socket.on(WsLeftFriend.eventName, (message: WsLeftFriend.eventMessageTemplate) => {
    const {friendId} = message;

    dispatch(refreshInvitation('FRIEND'));

    dispatch(
      setNotification({
        title: 'Left Friend',
        description: `User ${friendId} left your friend list`,
        status: 'error',
      }),
    );
  });

  socket.on(WsFriendConnection.eventName, (message: WsFriendConnection.eventMessageTemplate) => {
    const {friendId} = message;
    dispatch(refreshInvitation('FRIEND'));

    dispatch(
      setNotification({
        title: 'Friend Connection',
        description: `User ${friendId} is now online`,
        status: 'info',
      }),
    );
  });

  socket.on(
    WsFriendDisconnection.eventName,
    (message: WsFriendDisconnection.eventMessageTemplate) => {
      const {friendId} = message;
      dispatch(refreshInvitation('FRIEND'));

      dispatch(
        setNotification({
          title: 'Friend Disconnection',
          description: `User ${friendId} is now offline`,
          status: 'info',
        }),
      );
    },
  );
}
