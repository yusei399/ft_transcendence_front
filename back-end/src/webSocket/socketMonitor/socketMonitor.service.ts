import {Injectable, Scope} from '@nestjs/common';
import {Socket} from 'socket.io';

@Injectable({scope: Scope.DEFAULT})
export class SocketMonitorService {
  private socketsMap = new Map<number, Socket>();

  getClientSocketByUserId(userId: number) {
    return this.socketsMap.get(userId);
  }

  addUserToSocketMap(client: Socket) {
    this.socketsMap.set(client.data.userId, client);
  }

  removeUserFromSocketsMap(userId: number) {
    this.socketsMap.delete(userId);
  }
}
