import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class JoinChatRoomDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @IsOptional()
  @IsString()
  password?: string;
}
