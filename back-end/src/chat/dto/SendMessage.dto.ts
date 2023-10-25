import {Expose} from 'class-transformer';
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsNotEmpty()
  @IsString()
  messageContent: string;
}
