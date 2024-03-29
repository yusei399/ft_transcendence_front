import {AppDispatch} from '@/lib/redux';
import {io, Socket} from 'socket.io-client';
import {WsEvents_FromClient} from '@/shared/WsEvents';
import {
  setUpChatEvents,
  setUpFriendEvents,
  setUpGameEvents,
  setUpInvitationEvents,
  setUpUserEvents,
} from './events';

export class SocketService {
  private static socket: Socket | undefined = undefined;

  private static setSocket(newSocket: Socket) {
    SocketService.socket = newSocket;
  }

  private static getSocket() {
    return SocketService.socket;
  }

  private static setUpWsEvents(dispatch: AppDispatch, userId: number) {
    const socket = SocketService.getSocket();
    if (!socket) throw new Error('Socket is not initialized');

    setUpUserEvents(socket, dispatch, userId);
    setUpInvitationEvents(socket, dispatch);
    setUpFriendEvents(socket, dispatch);
    setUpChatEvents(socket, dispatch, userId);
    setUpGameEvents(socket, dispatch, userId);
  }

  public static closeSocket() {
    if (!SocketService.socket) return;
    SocketService.socket.close();
    SocketService.socket = undefined;
  }

  public static emit<T extends WsEvents_FromClient.template>(
    eventName: T['eventName'],
    data: T['message'],
  ) {
    const socket = SocketService.getSocket();
    if (!socket) return;
    if (SocketService.isSocketConnected()) socket.emit(eventName, data);
    else SocketService.closeSocket();
  }

  public static hasSocket(): boolean {
    return SocketService.socket !== undefined;
  }

  public static isSocketConnected(): boolean {
    return SocketService?.socket?.connected ?? false;
  }

  public static initializeSocket(dispatch: AppDispatch, authToken: string, userId: number) {
    if (SocketService.isSocketConnected()) return;
    SocketService.closeSocket();
    const socket = io('ws://localhost:3333/', {auth: {token: authToken}});
    SocketService.setSocket(socket);
    SocketService.setUpWsEvents(dispatch, userId);
  }
}
