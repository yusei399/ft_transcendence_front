import {Injectable, Scope} from '@nestjs/common';
import {BroadcastMessageInRoom, JoinLeaveRoom, RoomName, SendMessageInRoom} from './interface';
import {SocketMonitorService} from '../socketMonitor/socketMonitor.service';
import {Server} from 'socket.io';

@Injectable({scope: Scope.DEFAULT})
export class RoomMonitorService {
  constructor(private readonly socketMonitor: SocketMonitorService) {}
  private roomsMap = new Map<string, number>();
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  private getNbClientsInRoom(roomName: string) {
    return this.roomsMap.get(roomName) ?? 0;
  }

  private deleteServerRoom(roomName: string): void {
    this.server.sockets.adapter.rooms.delete(roomName);
  }

  private getRoomNameFromTemplate(template: RoomName): string {
    return `${template.prefix}${template.roomId}`;
  }

  addUserToRoom(data: JoinLeaveRoom): void {
    const client = this.socketMonitor.getClientSocketByUserId(data.userId);
    if (client) {
      const roomName = this.getRoomNameFromTemplate(data);
      client.join(roomName);
      const nbClients = this.getNbClientsInRoom(roomName);
      this.roomsMap.set(roomName, nbClients + 1);
    }
  }

  removeUserFromRoom(data: JoinLeaveRoom): void {
    const client = this.socketMonitor.getClientSocketByUserId(data.userId);
    if (client) {
      const roomName = this.getRoomNameFromTemplate(data);
      client.leave(roomName);
      const nbClients = this.getNbClientsInRoom(roomName);
      this.roomsMap.set(roomName, nbClients - 1);
      if (nbClients <= 1) this.deleteServerRoom(roomName);
    }
  }

  sendMessageInRoom(data: SendMessageInRoom): void {
    const roomName = this.getRoomNameFromTemplate(data);
    const socket = this.socketMonitor.getClientSocketByUserId(data.senderId) ?? this.server;
    if (this.getNbClientsInRoom(roomName) > 0) {
      socket.to(roomName).emit(data.eventName, data.message);
    }
  }

  broadcastMessageInRoom(data: BroadcastMessageInRoom): void {
    const roomName = this.getRoomNameFromTemplate(data);
    if (this.getNbClientsInRoom(roomName) > 0) this.server.to(roomName).emit(data.eventName, data.message);
  }
}
