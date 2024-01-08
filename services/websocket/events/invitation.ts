import {AppDispatch, setNotification} from '@/lib/redux';
import {refreshInvitation} from '@/lib/redux/slices/invitationSlice';
import {
  WsInvitationAccepted,
  WsInvitationCanceled,
  WsInvitationDeclined,
  WsNewInvitation,
} from '@/shared/WsEvents/invitation/';
import {Socket} from 'socket.io-client';

export function setUpInvitationEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(
    WsInvitationAccepted.eventName,
    (message: WsInvitationAccepted.eventMessageTemplate) => {
      const {invitationId, receiverId, kind} = message;

      dispatch(refreshInvitation(kind));

      dispatch(
        setNotification({
          title: 'Invitation',
          description: `User ${receiverId} accepted invitation ${invitationId} of ${kind}`,
          status: 'success',
        }),
      );
    },
  );

  socket.on(
    WsInvitationCanceled.eventName,
    (message: WsInvitationCanceled.eventMessageTemplate) => {
      const {invitationId, senderId, kind} = message;
      dispatch(refreshInvitation(kind));

      dispatch(
        setNotification({
          title: 'Invitation',
          description: `User ${senderId} canceled invitation ${invitationId} of ${kind}`,
          status: 'warning',
        }),
      );
    },
  );

  socket.on(
    WsInvitationDeclined.eventName,
    (message: WsInvitationDeclined.eventMessageTemplate) => {
      const {invitationId, receiverId, kind} = message;
      dispatch(refreshInvitation(kind));

      dispatch(
        setNotification({
          title: 'Invitation',
          description: `User ${receiverId} declined invitation ${invitationId} of ${kind}`,
          status: 'error',
        }),
      );
    },
  );

  socket.on(WsNewInvitation.eventName, (message: WsNewInvitation.eventMessageTemplate) => {
    const {invitationId, senderId, kind} = message;
    dispatch(refreshInvitation(kind));

    dispatch(
      setNotification({
        title: 'Invitation',
        description: `User ${senderId} sent invitation ${invitationId} of ${kind}`,
        status: 'info',
      }),
    );
  });
}
