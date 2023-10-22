import {MessageBody, SubscribeMessage, WebSocketGateway, WsException} from '@nestjs/websockets';
import {SendMessageDto} from './dto';
import {ChatService} from './chat.service';
import {Socket} from 'socket.io';
import {UseInterceptors} from '@nestjs/common';
import {WebSocketValidationInterceptor} from 'src/interceptor/WebSocket.interceptor';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chat: ChatService) {}

  @SubscribeMessage('newMessage')
  @UseInterceptors(WebSocketValidationInterceptor)
  async handleEvent(client: Socket, @MessageBody() dto: SendMessageDto) {
    console.log('pass');
    try {
      return await this.chat.sendMessage(dto);
    } catch (err) {
      console.log('prismaError');
      throw err instanceof WsException ? err : new WsException(`bad request`);
    }
  }

  @SubscribeMessage('test2')
  handleEvent2(@MessageBody() data: string): string {
    throw new WsException('degage!');
  }
}
