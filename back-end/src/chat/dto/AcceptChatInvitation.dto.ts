import {IsNotEmpty, IsNumber} from 'class-validator';

export class AcceptOrDeclineChatInvitationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  invitationId: number;
}
