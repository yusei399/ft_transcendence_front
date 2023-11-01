import {ConflictException, Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {SetRelationship} from './interface';
import {RoomMonitorService} from 'src/webSocket/room/roomMonitor.service';
import {FriendPublicProfilesList, UserPublicProfile} from 'src/shared/base_interfaces';

@Injectable()
export class FriendService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly room: RoomMonitorService,
  ) {}

  async getUserFriendUserIds(userId: number): Promise<number[]> {
    const profile = await this.prisma.profile.findUnique({
      where: {userId},
      select: {friendUserIds: true},
    });
    return profile.friendUserIds;
  }

  async getUserFriendProfilesList(userId: number): Promise<FriendPublicProfilesList> {
    const userProfile = await this.prisma.profile.findUnique({
      where: {userId},
      select: {friendsProfiles: {select: {userId: true, nickname: true, avatarUrl: true}}},
    });
    return {friendsProfiles: userProfile.friendsProfiles};
  }

  private async setSingleRelationship(userId: number, targetFriendId: number): Promise<void> {
    await this.prisma.profile.update({
      where: {userId: userId},
      data: {friendUserIds: {push: targetFriendId}},
    });
    this.room.addUserToRoom({prefix: 'Friend_Info-', roomId: targetFriendId, userId: userId});
    const wsMessage = `You are now friend with the user ${targetFriendId}`;
    this.room.sendMessageToUser({userId: userId, eventName: 'newFriend', message: wsMessage});
  }

  async setRelationship({
    userId,
    targetUserId,
  }: SetRelationship): Promise<FriendPublicProfilesList> {
    await this.setSingleRelationship(userId, targetUserId);
    await this.setSingleRelationship(targetUserId, userId);
    return this.getUserFriendProfilesList(userId);
  }

  private async unsetSingleRelationship(userId, targetUserId): Promise<void> {
    const user1FriendIds = await this.getUserFriendUserIds(userId);
    await this.prisma.profile.update({
      where: {userId: userId},
      data: {friendUserIds: {set: user1FriendIds.filter(id => id !== targetUserId)}},
    });
    this.room.removeUserFromRoom({prefix: 'Friend_Info-', roomId: targetUserId, userId: userId});
    const wsMessage = `You are no longer friend with the user ${targetUserId}`;
    this.room.sendMessageToUser({userId: userId, eventName: 'leftFriend', message: wsMessage});
  }
  async unsetRelationship({
    userId,
    targetUserId,
  }: SetRelationship): Promise<FriendPublicProfilesList> {
    if (userId === targetUserId)
      throw new ConflictException('userId and targetUserId are the same');
    await this.unsetSingleRelationship(userId, targetUserId);
    await this.unsetSingleRelationship(targetUserId, userId);
    return this.getUserFriendProfilesList(userId);
  }

  async addUserToAllFriendsRooms(userId: number, friendIds: number[]): Promise<void> {
    friendIds.forEach(roomId => {
      this.room.addUserToRoom({userId, prefix: 'Friend_Info-', roomId});
    });
  }

  async removeUserFromAllFriendsRooms(userId: number, friendIds: number[]): Promise<void> {
    friendIds.forEach(roomId => {
      this.room.removeUserFromRoom({userId, prefix: 'Friend_Info-', roomId});
    });
  }

  async handleUserConnection(userId: number): Promise<void> {
    const friendIds = await this.getUserFriendUserIds(userId);
    this.room.sendMessageInRoom({
      prefix: 'Friend_Info-',
      roomId: userId,
      eventName: 'friendConnection',
      message: `the user ${userId} is now online`,
      senderId: userId,
    });
    this.addUserToAllFriendsRooms(userId, friendIds);
  }

  async handleUserDisconnection(userId: number): Promise<void> {
    const friendIds = await this.getUserFriendUserIds(userId);
    this.room.sendMessageInRoom({
      prefix: 'Friend_Info-',
      roomId: userId,
      eventName: 'friendDisconnection',
      message: `the user ${userId} is now offline`,
      senderId: userId,
    });
    this.removeUserFromAllFriendsRooms(userId, friendIds);
  }
}
