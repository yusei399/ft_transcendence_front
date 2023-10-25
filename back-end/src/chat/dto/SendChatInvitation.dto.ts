import {IsNotEmpty, IsNumber} from 'class-validator';

export class SendChatInvitationDto {
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;
}
