import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {SendMessageData} from 'src/shared/WsEvents/chat';

export class SendMessageDto implements SendMessageData {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsNotEmpty()
  @IsString()
  messageContent: string;
}
