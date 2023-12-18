import {AppDispatch} from '@/lib/redux';
import {
  WsInvitationAccepted,
  WsInvitationCanceled,
  WsInvitationDeclined,
  WsNewInvitation,
} from '@/shared/WsEvents/invitation';
import {Socket} from 'socket.io-client';

export function setUpInvitationEvents(socket: Socket, dispatch: AppDispatch): void {
  socket.on(
    WsInvitationAccepted.eventName,
    (message: WsInvitationAccepted.eventMessageTemplate) => {
      console.log(message);
    },
  );

  socket.on(
    WsInvitationCanceled.eventName,
    (message: WsInvitationCanceled.eventMessageTemplate) => {
      console.log(message);
    },
  );

  socket.on(
    WsInvitationDeclined.eventName,
    (message: WsInvitationDeclined.eventMessageTemplate) => {
      console.log(message);
    },
  );

  socket.on(WsNewInvitation.eventName, (message: WsNewInvitation.eventMessageTemplate) => {
    console.log(message);
  });
}
