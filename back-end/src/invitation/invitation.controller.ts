import {Body, Controller, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {InvitationsService} from './invitation.service';
import {generateUpdateInvitationDto} from './interface';
import {InvitationActionPipe, InvitationKindPipe} from './pipe';
import {JwtAuthGuard} from 'src/auth/guard';
import {GetInfoFromJwt} from 'src/decorator';
import {InvitationKind} from '@prisma/client';
import {
  InvitationEndPointBase,
  SendInvitationEndPoint_NEST,
  SendInvitationReponse,
  UpdateInvitationEndPoint_NEST,
  UpdateInvitationReponse,
} from 'src/shared/HttpEndpoints/invitation';
import {SendInvitationDto} from './dto/SendInvitation.dto';
import {InvitationAction_Url} from 'src/shared/base_types';

@Controller(InvitationEndPointBase)
@UseGuards(JwtAuthGuard)
export class InvitationController {
  constructor(private readonly invitation: InvitationsService) {}

  @Post(SendInvitationEndPoint_NEST)
  sendInvidationHandler(
    @GetInfoFromJwt('userId') userId: number,
    @Param('kind', new InvitationKindPipe()) kind: InvitationKind,
    @Body() dto: SendInvitationDto,
  ): Promise<SendInvitationReponse> {
    console.log(dto);
    return this.invitation.sendInvitation({
      senderId: userId,
      receiverId: dto.targetUserId,
      kind,
      ...dto,
    });
  }

  @Post(UpdateInvitationEndPoint_NEST)
  async invitationActionHandler(
    @GetInfoFromJwt('userId') userId: number,
    @Param('kind', new InvitationKindPipe()) kind: InvitationKind,
    @Param('action', new InvitationActionPipe()) action: InvitationAction_Url,
    @Param('invitationId', ParseIntPipe) invitationId: number,
  ): Promise<UpdateInvitationReponse> {
    const dto = generateUpdateInvitationDto(userId, action, kind, invitationId);
    return this.invitation.updateInvitationStatus(dto);
  }
}
