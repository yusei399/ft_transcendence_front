import {AppDispatch, setSocketStatus} from '@/lib/redux';
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
  private static usedAuthToken: string | undefined = undefined;

  private static setSocket(newSocket: Socket) {
    SocketService.socket = newSocket;
  }

  private static getSocket() {
    return SocketService.socket;
  }

  private static setUpWsEvents(dispatch: AppDispatch, userId: number) {
    const socket = SocketService.getSocket();
    if (!socket) throw new Error('Socket is not initialized');

    socket.on('connect', () => dispatch(setSocketStatus('CONNECTED')));
    socket.on('disconnect', () => dispatch(setSocketStatus('DISCONNECTED')));

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
    SocketService.usedAuthToken = undefined;
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

  public static isSocketUsedToken(token: string): boolean {
    return SocketService.usedAuthToken === token;
  }

  public static isSocketConnected(): boolean {
    return SocketService?.socket?.connected ?? false;
  }

  public static initializeSocket(dispatch: AppDispatch, authToken: string, userId: number) {
    if (SocketService.isSocketConnected() && SocketService.isSocketUsedToken(authToken)) return;
    dispatch(setSocketStatus('CONNECTING'));
    SocketService.closeSocket();
    const socket = io('ws://localhost:3333/', {auth: {token: authToken}});
    SocketService.usedAuthToken = authToken;
    SocketService.setSocket(socket);
    SocketService.setUpWsEvents(dispatch, userId);
    const intervalId = setInterval(() => {
      if (SocketService.isSocketConnected()) {
        dispatch(setSocketStatus('CONNECTED'));
        clearInterval(intervalId);
      }
    }, 100);

    const timeoutId = setTimeout(() => {
      if (!SocketService.isSocketConnected()) {
        dispatch(setSocketStatus('DISCONNECTED'));
        SocketService.closeSocket();
      }
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    }, 1000);
  }
}
