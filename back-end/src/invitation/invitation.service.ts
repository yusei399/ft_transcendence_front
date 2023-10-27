import {BadRequestException, ConflictException, HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {SendInvitation, UpdateInvitationStatus} from './interface';
import {ChatService} from 'src/chat/chat.service';
import {FriendService} from 'src/friend/friend.service';
import {HandleUpdatedInvitationRelatedEvent} from 'src/friend/interface/handleUpdatedInvitationRelatedEvent.templace';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chat: ChatService,
    private readonly friend: FriendService,
  ) {}

  async sendInvitation(data: SendInvitation) {
    if (data.receiverId === data.senderId)
      throw new ConflictException('Sender and Receiver user are the same');
    const pendingInvitation = await this.prisma.invitation.findFirst({
      where: {senderId: data.senderId, receiverId: data.receiverId, kind: data.kind, status: 'PENDING'},
    });
    if (pendingInvitation) throw new ConflictException('Invitation already sent');
    try {
      const invitation = await this.prisma.invitation.create({
        data: {...data},
      });
      if (!invitation.targetChatId) delete invitation.targetChatId;
      if (!invitation.targetGameId) delete invitation.targetGameId;
      return invitation;
    } catch (err) {
      throw new BadRequestException('No such user');
    }
  }

  async handleUpdatedInvitationRelatedEvent(dto: HandleUpdatedInvitationRelatedEvent) {
    if (dto.kind === 'CHAT' && dto.targetStatus === 'ACCEPTED') {
      return this.chat.handleAcceptedChatInvitation();
    } else if (dto.kind === 'FRIEND' && dto.targetStatus === 'ACCEPTED') {
      return this.friend.createRelationship({...dto});
    }
  }

  async updateInvitationStatus(data: UpdateInvitationStatus) {
    const {targetStatus, kind, ...dataToSeach} = data;
    try {
      const invitation = await this.prisma.invitation.update({
        where: {kind, ...dataToSeach},
        data: {status: targetStatus},
        select: {invitationId: true, senderId: true, receiverId: true, kind: true, status: true},
      });
      const dto = {...invitation, targetStatus, kind};
      const targetEvent = this.handleUpdatedInvitationRelatedEvent(dto);
      return targetEvent ?? invitation;
    } catch (err) {
      if (err instanceof HttpException) throw err;
    }
    throw new BadRequestException('No such invitation available for this user');
  }
}
