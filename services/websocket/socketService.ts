import {AppDispatch} from '@/lib/redux';
import {io, Socket} from 'socket.io-client';
import {WsEvents_FromClient} from '@/shared/WsEvents';
import {setUpChatEvents, setUpGameEvents, setUpInvitationEvents} from './events';
import {WsConnection, WsDisconnection} from '@/shared/WsEvents/default';

export class SocketService {
  private static socket: Socket | null = null;
  private static isConnected = false;

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
    socket.on(WsConnection.eventName, (message: WsConnection.eventMessageTemplate) => {
      SocketService.isConnected = true;
    });

    socket.on(WsDisconnection.eventName, (message: WsConnection.eventMessageTemplate) => {
      SocketService.closeSocket();
    });

    setUpInvitationEvents(socket, dispatch);
    setUpChatEvents(socket, dispatch);
    setUpGameEvents(socket, dispatch);
  }

  public static closeSocket() {
    if (!SocketService.socket) return;
    SocketService.socket.close();
    SocketService.socket = null;
    SocketService.isConnected = false;
  }

  public static emit<T extends WsEvents_FromClient.template>(
    eventName: T['eventName'],
    data: T['message'],
  ) {
    SocketService.getSocket().emit(eventName, data);
  }

  public static hasSocket(): boolean {
    return SocketService.socket !== null;
  }

  public static isSocketConnected(): boolean {
    return SocketService.isConnected;
  }

  public static initializeSocket(dispatch: AppDispatch, authToken: string) {
    SocketService.closeSocket();
    const socket = io('ws://localhost:3333/', {auth: {token: authToken}});
    SocketService.setSocket(socket);
    SocketService.setUpWsEvents(dispatch);
  }
}
