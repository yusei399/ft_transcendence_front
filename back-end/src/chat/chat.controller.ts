import { Controller, Get } from '@nestjs/common';

@Controller('chat')
export class ChatController {
  @Get()
  getChatroom() {
    return { message: 'Welcome to the chatroom!' };
  }
}
