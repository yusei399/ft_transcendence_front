import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {CreateChatRoomDto, JoinChatRoomDto, SendChatInvitationDto, SendMessageDto} from './dto';
import {AcceptOrDeclineChatInvitationDto} from './dto/AcceptChatInvitation.dto';
import {Socket} from 'socket.io';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createChatRoom(dto: CreateChatRoomDto) {
    return this.prisma.chat.create({data: {...dto}});
  }

  async joinChatRoom(dto: JoinChatRoomDto) {
    const room = await this.prisma.chat.findUnique({where: {chatId: dto.roomId}});

    if (room.password && room.password !== dto.password) throw new UnauthorizedException();
    return this.prisma.chatParticipation.create({
      data: {
        chatId: room.chatId,
        userId: dto.userId,
      },
    });
  }

  async sendMessage(dto: SendMessageDto) {
    const participation = await this.prisma.chatParticipation.findUnique({
      where: {
        chatId_userId: {
          chatId: dto.roomId,
          userId: dto.userId,
        },
      },
    });
    const now = Date.now();
    if (participation?.blockedUntil.getDate() > now) throw new UnauthorizedException('user still blocked!');
    if (participation?.mutedUntil.getDate() > now) throw new UnauthorizedException('user still mute!');
    return this.prisma.message.create({
      data: {
        chatParticipationId: participation.chatParticipationId,
        messageContent: dto.messageContent,
      },
    });
  }

  async sendChatInvitation(dto: SendChatInvitationDto) {
    return this.prisma.invitation.create({
      data: {
        senderId: dto.senderId,
        receiverId: dto.receiverId,
        kind: 'CHAT',
        chatId: dto.roomId,
      },
    });
  }

  async acceptChatInvitation(dto: AcceptOrDeclineChatInvitationDto) {
    const invitation = await this.prisma.invitation.update({
      where: {invitationId: dto.invitationId},
      data: {status: 'ACCEPTED'},
    });
    return this.joinChatRoom({
      userId: invitation.receiverId,
      roomId: invitation.chatId,
    });
  }

  async declineChatInvitation(dto: AcceptOrDeclineChatInvitationDto) {
    return await this.prisma.invitation.update({
      where: {invitationId: dto.invitationId},
      data: {status: 'REFUSED'},
    });
  }

  async getAllMessagesFromChatRoomId(userId: number, roomId: number) {
    const messages = await this.prisma.message.findMany({
      where: {chatParticipation: {chatId: roomId}},
      orderBy: {createdAt: 'asc'},
    });

    const participations = await this.prisma.chatParticipation.findMany({
      where: {chatId: roomId},
      select: {
        blockedUntil: true,
        user: {select: {userId: true, avatarUrl: true, nickname: true}},
      },
    });
    participations.map(participation => {
      if (participation.user.userId === userId && participation?.blockedUntil < new Date())
        return {users: participations, messages};
    });
    throw new UnauthorizedException('This user has no access to this chat');
  }

  async getJoinedRoomIdsByUserId(userId: number): Promise<number[]> {
    const joinedRooms = await this.prisma.chatParticipation.findMany({
      where: {userId, blockedUntil: {not: {gte: new Date()}}},
      select: {chatId: true},
    });
    return joinedRooms.map(room => {
      return room.chatId;
    });
  }

  async addUserToJoinedChatroom(userId: number, client: Socket) {
    const joinedRoomIds = await this.getJoinedRoomIdsByUserId(userId);

    for (const roomId of joinedRoomIds) {
      client.join(`room-${roomId}`);
    }
  }
  async removeUserFromJoinedChatRoom(userId: number, client: Socket) {
    const joinedRoomIds = await this.getJoinedRoomIdsByUserId(userId);

    for (const roomId of joinedRoomIds) {
      client.leave(`room-${roomId}`);
    }
  }
}
