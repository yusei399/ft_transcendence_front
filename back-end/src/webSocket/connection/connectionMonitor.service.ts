import {Injectable} from '@nestjs/common';
import {Socket} from 'socket.io';
import {SocketMonitorService} from '../socketMonitor/socketMonitor.service';
import {FriendService} from 'src/friend/friend.service';

@Injectable()
export class ConnectionMonitorService {
  constructor(
    private readonly socketMonitor: SocketMonitorService,
    private readonly friend: FriendService,
  ) {}

  addClientToRelatedRooms(userId: number) {
    this.friend.handleUserConnection(userId);
  }

  removeClientFromRelatedRooms(userId: number) {
    this.friend.handleUserDisconnection(userId);
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
