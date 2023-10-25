import {Injectable} from '@nestjs/common';
import {Socket} from 'socket.io';
import {RelationshipService} from 'src/relationship/relationship.service';
import {SocketMonitorService} from '../socket/socketMonitor.service';

@Injectable()
export class ConnectionMonitorService {
  constructor(
    private readonly socketMonitor: SocketMonitorService,
    private readonly relationship: RelationshipService,
  ) {}

  addClientToRelatedRooms(userId: number) {
    this.relationship.handleUserConnection(userId);
  }

  removeClientFromRelatedRooms(userId: number) {
    this.relationship.handleUserDisconnection(userId);
  }

  handleClientConnection(client: Socket) {
    this.socketMonitor.addUserToSocketMap(client);
    this.addClientToRelatedRooms(client.data.userId);
  }

  handleClientDisconnection(userId: number) {
    this.removeClientFromRelatedRooms(userId);
    this.socketMonitor.removeUserFromSocketsMap(userId);
  }
}
