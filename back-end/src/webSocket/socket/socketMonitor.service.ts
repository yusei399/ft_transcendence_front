import {Injectable} from '@nestjs/common';
import {Socket} from 'socket.io';

@Injectable()
export class SocketMonitorService {
  private socketsMap = new Map<number, Socket>();

  getClientSocketByUserId(userId: number) {
    return this.socketsMap[userId];
  }

  addUserToSocketMap(client: Socket) {
    this.socketsMap.set(client.data.userId, client);
  }

  removeUserFromSocketsMap(userId: number) {
    this.socketsMap.delete(userId);
  }
}
