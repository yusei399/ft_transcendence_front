import {Injectable} from '@nestjs/common';
import {Socket} from 'socket.io';
import {SocketMonitorService} from '../socketMonitor/socketMonitor.service';
import {FriendService} from 'src/friend/friend.service';
import {ChatService} from 'src/chat/chat.service';

@Injectable()
export class ConnectionMonitorService {
  constructor(
    private readonly socketMonitor: SocketMonitorService,
    private readonly friend: FriendService,
    private readonly chat: ChatService,
  ) {}

  addClientToRelatedRooms(userId: number) {
    this.friend.handleUserConnection(userId);
    this.chat.handleUserConnection(userId);
  }

  removeClientFromRelatedRooms(userId: number) {
    this.friend.handleUserDisconnection(userId);
    this.chat.handleUserDisconnection(userId);
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
