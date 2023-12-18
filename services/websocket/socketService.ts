import {AppDispatch} from '@/lib/redux';
import {io, Socket} from 'socket.io-client';
import {WsEvents_FromClient} from '@/shared/WsEvents';
import {
  setUpChatEvents,
  setUpDefaultEvents,
  setUpGameEvents,
  setUpInvitationEvents,
} from './events';

export class SocketService {
  private static socket: Socket | null = null;

  private static setSocket(newSocket: Socket) {
    SocketService.socket = newSocket;
  }

  private static getSocket() {
    if (!SocketService.socket) {
      throw new Error('Socket is not initialized');
    }
    return SocketService.socket;
  }

  private static setUpWsEvents(dispatch: AppDispatch) {
    const socket = SocketService.getSocket();
    setUpDefaultEvents(socket, dispatch);
    setUpInvitationEvents(socket, dispatch);
    setUpChatEvents(socket, dispatch);
    setUpGameEvents(socket, dispatch);
  }

  public static emit<T extends WsEvents_FromClient.template>(
    eventName: T['eventName'],
    data: T['message'],
  ) {
    SocketService.getSocket().emit(eventName, data);
  }

  public static initializeSocket(dispatch: AppDispatch, authToken: string) {
    const socket = io('ws://localhost:3333/', {auth: {token: authToken}});
    SocketService.setSocket(socket);
    SocketService.setUpWsEvents(dispatch);
  }
}
