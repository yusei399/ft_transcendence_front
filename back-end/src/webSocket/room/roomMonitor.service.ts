import {Injectable} from '@nestjs/common';
import {BroadcastMessageInRoom, JoinLeaveRoom, RoomName, SendMessageInRoom} from './interface';
import {SocketMonitorService} from '../socket/socketMonitor.service';
import {Server} from 'socket.io';

@Injectable()
export class RoomMonitorService {
  constructor(private readonly socketMonitor: SocketMonitorService) {}
  private roomsMap = new Map<string, number>();
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  private getRoomNameFromTemplate(template: RoomName) {
    return `${template.prefix}${template.roomId}`;
  }

  addUserToRoom(data: JoinLeaveRoom) {
    const client = this.socketMonitor.getClientSocketByUserId(data.userId);
    if (client) {
      const roomName = this.getRoomNameFromTemplate(data);
      client.join(roomName);
      this.roomsMap[roomName]++;
    }
  }

  removeUserFromRoom(data: JoinLeaveRoom) {
    const client = this.socketMonitor.getClientSocketByUserId(data.userId);
    if (client) {
      const roomName = this.getRoomNameFromTemplate(data);
      client.leave(roomName);
      this.roomsMap[roomName]--;
      if (this.roomsMap[roomName] === 0) this.server.sockets.adapter.rooms.delete(roomName);
    }
  }

  sendMessageInRoom(data: SendMessageInRoom) {
    const roomName = this.getRoomNameFromTemplate(data);
    const client = this.socketMonitor.getClientSocketByUserId(data.roomId);
    if (this.roomsMap[roomName] > 0) client.to(roomName).emit(data.eventName, data.message);
  }

  broadcastMessageInRoom(data: BroadcastMessageInRoom) {
    const roomName = this.getRoomNameFromTemplate(data);
    if (this.roomsMap[roomName] > 0) this.server.to(roomName).emit(data.eventName, data.message);
  }
}
