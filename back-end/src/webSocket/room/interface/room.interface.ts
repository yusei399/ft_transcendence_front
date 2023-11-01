import {WsEventName} from 'src/shared/base_types';

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
