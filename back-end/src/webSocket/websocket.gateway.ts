import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {AuthService} from 'src/auth/auth.service';
import {RoomMonitorService} from './room/roomMonitor.service';
import {ConnectionMonitorService} from './connection/connectionMonitor.service';

@WebSocketGateway()
export class SocketMonitorGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly auth: AuthService,
    private readonly roomMonitor: RoomMonitorService,
    private readonly connectionMonitor: ConnectionMonitorService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.roomMonitor.setServer(server);
  }

  handleConnection(client: Socket) {
    try {
      const {userId} = this.auth.verifyAndDecodeAuthToken(client.handshake.auth.token);
      this.connectionMonitor.handleClientConnection(userId, client);
    } catch (err) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const {userId} = this.auth.decodeToken(client.handshake.auth.token);
    this.connectionMonitor.handleClientDisconnection(userId);
  }
}
