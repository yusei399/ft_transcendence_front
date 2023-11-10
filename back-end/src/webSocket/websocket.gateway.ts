import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {AuthService} from 'src/auth/auth.service';
import {ConnectionMonitorService} from './connection/connectionMonitor.service';
import {SocketAuthMiddleware} from 'src/auth/middleware/ws.middleware';
import {RoomMonitorService} from './room/roomMonitor.service';

@WebSocketGateway()
export class SocketMonitorGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  constructor(
    private readonly roomMonitor: RoomMonitorService,
    private readonly connectionMonitor: ConnectionMonitorService,
  ) {}

  @WebSocketServer() server: Server;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
    this.roomMonitor.setServer(this.server);
  }

  handleConnection(client: Socket) {
    this.connectionMonitor.handleClientConnection(client);
  }

  handleDisconnect(client: Socket) {
    const {userId} = AuthService.decodeToken(client.handshake.auth.token);
    this.connectionMonitor.handleClientDisconnection(userId);
  }
}
