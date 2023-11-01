import {Injectable, Scope} from '@nestjs/common';
import {BroadcastMessageInRoom, JoinLeaveRoom, RoomName, SendMessageInRoom} from './interface';
import {SocketMonitorService} from '../socketMonitor/socketMonitor.service';
import {Server} from 'socket.io';
import {SendWsMessageToClient} from '../socketMonitor/interface/socket.interface';

@Injectable({scope: Scope.DEFAULT})
export class RoomMonitorService {
  constructor(private readonly socketMonitor: SocketMonitorService) {}
  private roomsMap = new Map<string, number[]>();
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  private getNbClientsInRoom(roomName: string) {
    return this.roomsMap.get(roomName)?.length ?? 0;
  }

  private addUserToRoomMap(roomName: string, userId: number): void {
    const users = this.roomsMap.get(roomName) ?? [];
    users.push(userId);
    this.roomsMap.set(roomName, users);
  }

  private removeUserFromRoomMap(roomName: string, userId: number): void {
    const users = this.roomsMap.get(roomName) ?? [];
    const index = users.indexOf(userId);
    if (index >= 0) {
      users.splice(index, 1);
      this.roomsMap.set(roomName, users);
      if (users.length === 0) this.deleteServerRoom(roomName);
    }
  }

  private deleteServerRoom(roomName: string): void {
    this.server.sockets.adapter.rooms.delete(roomName);
    this.roomsMap.delete(roomName);
  }

  private getRoomNameFromTemplate(template: RoomName): string {
    return `${template.prefix}${template.roomId}`;
  }

  addUserToRoom(data: JoinLeaveRoom): void {
    const client = this.socketMonitor.getClientSocketByUserId(data.userId);
    if (client) {
      const roomName = this.getRoomNameFromTemplate(data);
      client.join(roomName);
      this.addUserToRoomMap(roomName, data.userId);
    }
  }

  removeUserFromRoom(data: JoinLeaveRoom): void {
    const client = this.socketMonitor.getClientSocketByUserId(data.userId);
    if (client) {
      const roomName = this.getRoomNameFromTemplate(data);
      client.leave(roomName);
      this.removeUserFromRoomMap(roomName, data.userId);
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
    if (this.getNbClientsInRoom(roomName) > 0)
      this.server.to(roomName).emit(data.eventName, data.message);
  }

  sendMessageToUser(dto: SendWsMessageToClient): void {
    const client = this.socketMonitor.getClientSocketByUserId(dto.userId);
    if (client) {
      client.emit(dto.eventName, dto.message);
    }
  }
}
