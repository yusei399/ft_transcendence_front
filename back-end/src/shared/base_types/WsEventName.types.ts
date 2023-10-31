export type defaultEventName = 'connect' | 'disconnect' | 'exception';
export type InvitationEventName =
  | 'newInvitation'
  | 'invitationAccepted'
  | 'invitationDeclined'
  | 'invitationCanceled';
export type FriendEventName =
  | 'newFriend'
  | 'leftFriend'
  | 'friendConnection'
  | 'friendDisconnection';
export type ChatEventName = 'newMessage' | 'userJoining' | 'userLeaving';
export type GameEventName = 'playerMove' | 'ballPosition';

export type WsEventName =
  | defaultEventName
  | InvitationEventName
  | FriendEventName
  | ChatEventName
  | GameEventName;
