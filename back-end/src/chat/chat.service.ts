import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {CreateChatRoomDto, JoinChatRoomDto, SendMessageDto} from './dto';
import {Socket} from 'socket.io';
import {WsException} from '@nestjs/websockets';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  private async createChatRoom(dto: CreateChatRoomDto) {
    return this.prisma.chat.create({data: {...dto}});
  }

  private async joinChatRoom(dto: JoinChatRoomDto) {
    const room = await this.prisma.chat.findUnique({where: {chatId: dto.roomId}});
    if (!room) throw new NotFoundException(`no such room`);
    if (room.password && room.password !== dto.password) throw new UnauthorizedException(`invalid password`);
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
    if (!participation) throw new WsException('no such room available for this user');
    const now = Date.now();
    if (participation?.blockedUntil.getDate() > now) throw new WsException('user still blocked!');
    if (participation?.mutedUntil.getDate() > now) throw new WsException('user still mute!');
    return this.prisma.message.create({
      data: {
        chatParticipationId: participation.chatParticipationId,
        messageContent: dto.messageContent,
      },
    });
  }

  async handleAcceptedChatInvitation() {
    return;
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
        user: {include: {profile: true}},
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
