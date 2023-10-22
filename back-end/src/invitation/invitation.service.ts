import {BadRequestException, ConflictException, HttpException, Injectable} from '@nestjs/common';
import {PrismaService} from 'src/prisma/prisma.service';
import {SendInvitation, UpdateInvitationStatus} from './interface';
import {ChatService} from 'src/chat/chat.service';
import {RelationshipService} from 'src/relationship/relationship.service';
import {HandleUpdatedInvitationRelatedEvent} from 'src/relationship/interface/handleUpdatedInvitationRelatedEvent.templace';

@Injectable()
export class InvitationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chat: ChatService,
    private readonly relationship: RelationshipService,
  ) {}

  async sendInvitation(data: SendInvitation) {
    if (data.receiverId === data.senderId)
      throw new ConflictException('Sender and Receiver user are the same');
    try {
      return await this.prisma.invitation.create({
        data: {...data},
        select: {invitationId: true},
      });
    } catch (err) {
      throw new BadRequestException('No such user');
    }
  }

  async handleUpdatedInvitationRelatedEvent(dto: HandleUpdatedInvitationRelatedEvent) {
    if (dto.kind === 'CHAT' && dto.targetStatus === 'ACCEPTED') {
      return;
    } else if (dto.kind === 'FRIEND' && dto.targetStatus === 'ACCEPTED') {
      return this.relationship.createRelationship({...dto});
    }
  }

  async updateInvitationStatus(data: UpdateInvitationStatus) {
    const {targetStatus, kind, ...dataToSeach} = data;
    try {
      const invitation = await this.prisma.invitation.update({
        where: {kind, ...dataToSeach},
        data: {status: targetStatus},
        select: {invitationId: true, senderId: true, receiverId: true},
      });
      const dto = {...invitation, targetStatus, kind};
      const targetEvent = this.handleUpdatedInvitationRelatedEvent(dto);
      if (targetEvent) return targetEvent;
    } catch (err) {
      if (err instanceof HttpException) throw err;
    }
    throw new BadRequestException('No such invitation available for this user');
  }
}
