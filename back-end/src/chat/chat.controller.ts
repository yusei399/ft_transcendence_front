import {Controller, Get, ParseIntPipe, Query} from '@nestjs/common';
import {ChatService} from './chat.service';
import {GetInfoFromJwt} from 'src/decorator';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChatroom() {
    return {message: 'Welcome to the chatroom!'};
  }

  @Get('allMessages')
  getAllMessage(@GetInfoFromJwt('userId') userId: number, @Query('roomId', ParseIntPipe) roomId: number) {
    return this.chatService.getAllMessagesFromChatRoomId(userId, roomId);
  }
}
