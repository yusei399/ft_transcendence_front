import {Body, Controller, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import {InvitationActionType} from './enum';
import {InvitationsService} from './invitation.service';
import {generateUpdateInvitationDto} from './interface';
import {InvitationActionPipe, InvitationKindPipe} from './pipe';
import {JwtAuthGuard} from 'src/auth/guard';
import {GetInfoFromJwt} from 'src/decorator';
import {InvitationKind} from '@prisma/client';

@Controller('invitation')
@UseGuards(JwtAuthGuard)
export class InvitationController {
  constructor(private readonly invitation: InvitationsService) {}

  @Post('/:kind/send')
  sendInvidationHandler(
    @GetInfoFromJwt('userId') userId: number,
    @Param('kind', new InvitationKindPipe()) kind: InvitationKind,
    @Body('targetId', ParseIntPipe) receiverId: number,
  ) {
    return this.invitation.sendInvitation({senderId: userId, receiverId, kind});
  }

  @Post('/:kind/:action/:invitationId')
  async invitationActionHandler(
    @GetInfoFromJwt('userId') userId: number,
    @Param('kind', new InvitationKindPipe()) kind: InvitationKind,
    @Param('action', new InvitationActionPipe()) action: InvitationActionType,
    @Param('invitationId', ParseIntPipe) invitationId: number,
  ) {
    const dto = generateUpdateInvitationDto(userId, action, kind, invitationId);
    return this.invitation.updateInvitationStatus(dto);
  }
}
