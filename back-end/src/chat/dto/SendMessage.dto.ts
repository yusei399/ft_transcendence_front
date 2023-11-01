import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {SendMessageData} from 'src/shared/WsEvents/chat';

export class SendMessageDto implements SendMessageData {
  @IsNumber()
  chatId: number;

  @IsString()
  @IsNotEmpty()
  messageContent: string;
}
