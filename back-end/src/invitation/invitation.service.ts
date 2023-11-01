import {BadRequestException, ConflictException, HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {SendInvitation, UpdateInvitationStatus} from './interface';
import {ChatService} from 'src/chat/chat.service';
import {FriendService} from 'src/friend/friend.service';
import {HandleUpdatedInvitationRelatedEvent} from 'src/friend/interface/handleUpdatedInvitationRelatedEvent.template';
import {SendInvitationReponse, UpdateInvitationReponse} from 'src/shared/HttpEndpoints/invitation';
import {RoomMonitorService} from 'src/webSocket/room/roomMonitor.service';
import {OnNewInvitationEvent} from 'src/shared/WsEvents/invitation';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chat: ChatService,
    private readonly friend: FriendService,
    private readonly room: RoomMonitorService,
  ) {}

  private async checkSentInvitation(data: SendInvitation): Promise<void> | never {
    if (data.receiverId === data.senderId)
      throw new ConflictException('Sender and Receiver user are the same');

    if (data.kind === 'FRIEND') {
      const userFriendIds = await this.friend.getUserFriendUserIds(data.receiverId);
      if (userFriendIds.indexOf(data.senderId) >= 0)
        throw new BadRequestException('This relationship is already established');
    } else if (data.kind === 'CHAT') {
      if (!data.targetChatId) throw new BadRequestException('No targetChatId provided');

      const chat = await this.prisma.chat.findUnique({
        where: {chatId: data.targetChatId},
        select: {chatId: true, participants: {select: {userId: true}}},
      });
      if (!chat) throw new BadRequestException('No such chat exist');
      if (chat?.participants.find(p => p.userId === data.receiverId))
        throw new BadRequestException('User already present in chatroom');
    } else if (data.kind === 'GAME') {
      if (!data.targetGameId) throw new BadRequestException('No targetGameId provided');

      const game = await this.prisma.game.findUnique({
        where: {gameId: data.targetGameId},
        select: {gameId: true, gameStatus: true, participants: {select: {userId: true}}},
      });
      if (!game) throw new BadRequestException('No such game exist');

      if (game?.gameStatus !== 'WAITING_FOR_PLAYER')
        throw new BadRequestException('This game is no longer waiting for new player');

      if (game?.participants.find(p => p.userId === data.receiverId))
        throw new BadRequestException('User already present in this game');
    }

    const pendingInvitation = await this.prisma.invitation.findFirst({
      where: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        kind: data.kind,
        status: 'PENDING',
      },
      select: {invitationId: true},
    });
    if (pendingInvitation) throw new ConflictException('Invitation already sent');
  }

  async sendInvitation(data: SendInvitation): Promise<SendInvitationReponse> {
    await this.checkSentInvitation(data);
    const {senderId, receiverId, kind, targetChatId, targetGameId} = data;
    try {
      const invitation = await this.prisma.invitation.create({
        data: {senderId, receiverId, kind, targetChatId, targetGameId},
        select: {
          invitationId: true,
          senderId: true,
          receiverId: true,
          status: true,
          kind: true,
          targetChatId: kind === 'CHAT',
          targetGameId: kind === 'GAME',
        },
      });
      const WsMessage: OnNewInvitationEvent = invitation;
      this.room.sendMessageToUser({
        userId: receiverId,
        eventName: 'newInvitation',
        message: WsMessage,
      });
      return invitation;
    } catch (err) {
      throw new BadRequestException('No such user');
    }
  }

  async handleUpdatedInvitationRelatedEvent(dto: HandleUpdatedInvitationRelatedEvent) {
    if (dto.kind === 'CHAT') {
      this.chat.joinChat({userId: dto.receiverId, chatId: dto.targetChatId}, true);
    } else if (dto.kind === 'FRIEND') {
      this.friend.setRelationship({userId: dto.senderId, targetUserId: dto.receiverId});
    } else if (dto.kind === 'GAME') {
    }
  }

  async updateInvitationStatus(data: UpdateInvitationStatus): Promise<UpdateInvitationReponse> {
    const {targetStatus, kind, ...dataToSeach} = data;
    try {
      const invitation = await this.prisma.invitation.update({
        where: {kind, ...dataToSeach},
        data: {status: targetStatus},
        select: {
          invitationId: true,
          senderId: true,
          receiverId: true,
          kind: true,
          status: true,
          targetChatId: kind === 'CHAT',
          targetGameId: kind === 'GAME',
        },
      });
      const dto = {...invitation, targetStatus, kind};
      if (targetStatus === 'ACCEPTED') this.handleUpdatedInvitationRelatedEvent(dto);
      this.room.sendMessageToUser({
        userId: dto.senderId ? invitation.senderId : invitation.receiverId,
        eventName:
          targetStatus === 'ACCEPTED'
            ? 'invitationAccepted'
            : targetStatus === 'REFUSED'
            ? 'invitationDeclined'
            : 'invitationCanceled',
        message: `the invitation ${
          invitation.invitationId
        } has been ${targetStatus.toLowerCase()}.`,
      });
      return invitation;
    } catch (err) {
      if (err instanceof HttpException) throw err;
    }
    throw new BadRequestException('No such invitation available for this user');
  }
}
