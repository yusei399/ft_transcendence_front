export interface RoomName {
  prefix: 'Friend_Info-' | 'Chatroom-' | 'Game-';
  roomId: number;
}

export interface JoinLeaveRoom extends RoomName {
  userId: number;
}

export interface BroadcastMessageInRoom extends RoomName {
  eventName: WsEventName;
  message: unknown;
}

export interface SendMessageInRoom extends BroadcastMessageInRoom {
  senderId: number;
}

export type defaultEventName = 'connect' | 'disconnect' | 'exception';
export type InvitationEventName =
  | 'newInvitation'
  | 'invitationAccepted'
  | 'invitationDeclined'
  | 'invitationCanceled';
export type FriendEventName = 'friendConnection' | 'friendDisconnection';
export type ChatEventName = 'newMessage' | 'userJoining' | 'userLeaving';
export type GameEventName = 'playerMove' | 'ballPosition';

export type WsEventName =
  | defaultEventName
  | InvitationEventName
  | FriendEventName
  | ChatEventName
  | GameEventName;
