import {Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {UserService} from 'src/user/user.service';
import {CreateRelationship} from './interface';
import {RoomMonitorService} from 'src/webSocket/room/roomMonitor.service';
import { UserPublicProfile } from 'src/shared/base_interfaces';

@Injectable()
export class FriendService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly roomMonitor: RoomMonitorService,
  ) {}

  async getUserFriendUserIds(userId: number): Promise<number[]> {
    const relationships = await this.prisma.invitation.findMany({
      where: {
        kind: 'FRIEND',
        status: 'ACCEPTED',
        OR: [{senderId: userId}, {receiverId: userId}],
      },
      select: {senderId: true, receiverId: true},
    });

    return relationships.map(rel => {
      return rel.senderId !== userId ? rel.senderId : rel.receiverId;
    });
  }

  async getUserFriendProfilesList(userId: number): Promise<UserPublicProfile[]> {
    const user = await this.prisma.user.findUnique({
      where: {userId},
      select: {FriendsProfile: {select: {userId:true, nickname:true, avatarUrl:true}}},
    });
    return user.FriendsProfile;
  }

  // async getUserFriendIdsList(userId: number) {
  //   return await this.prisma.user.findUnique({
  //     where: {userId},
  //     select: {FriendsProfile: {select: {userId: true}}},
  //   });
  // }

  async createRelationship(dto: CreateRelationship) {
    const {invitationId, senderId, receiverId} = dto;
    // const relationship = await this.prisma.relationship.create({data: {invitationId}});
    this.roomMonitor.addUserToRoom({prefix: 'Friend_Info-', roomId: receiverId, userId: senderId});
    this.roomMonitor.addUserToRoom({prefix: 'Friend_Info-', roomId: senderId, userId: receiverId});
    // return relationship;
  }

  async addUserToAllFriendsRooms(userId: number, friendIds: number[]) {
    friendIds.forEach(roomId => {
      this.roomMonitor.addUserToRoom({userId, prefix: 'Friend_Info-', roomId});
    });
  }

  async removeUserFromAllFriendsRooms(userId: number, friendIds: number[]) {
    friendIds.forEach(roomId => {
      this.roomMonitor.removeUserFromRoom({userId, prefix: 'Friend_Info-', roomId});
    });
  }

  async handleUserConnection(userId: number) {
    const friendIds = await this.getUserFriendUserIds(userId);
    this.roomMonitor.sendMessageInRoom({
      prefix: 'Friend_Info-',
      roomId: userId,
      eventName: 'friendConnection',
      message: `the user ${userId} is now online`,
      senderId: userId,
    });
    this.addUserToAllFriendsRooms(userId, friendIds);
  }

  async handleUserDisconnection(userId: number) {
    const friendIds = await this.getUserFriendUserIds(userId);
    this.roomMonitor.sendMessageInRoom({
      prefix: 'Friend_Info-',
      roomId: userId,
      eventName: 'friendDisconnection',
      message: `the user ${userId} is now offline`,
      senderId: userId,
    });
    this.removeUserFromAllFriendsRooms(userId, friendIds);
  }
}
