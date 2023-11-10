import {Injectable, Scope} from '@nestjs/common';
import {Socket} from 'socket.io';

@Injectable({scope: Scope.DEFAULT})
export class SocketMonitorService {
  private socketsMap = new Map<number, Socket>();

  getClientSocketByUserId(userId: number): Socket {
    return this.socketsMap.get(userId);
  }

  addUserToSocketMap(client: Socket): void {
    this.socketsMap.set(client.data.userId, client);
  }

  removeUserFromSocketsMap(userId: number): void {
    this.socketsMap.delete(userId);
  }
}
