import {MessageBody, SubscribeMessage, WebSocketGateway, WsException} from '@nestjs/websockets';
import {SendMessageDto} from './dto';
import {ChatService} from './chat.service';
import {ValidateAndTransformWebSocketDto} from 'src/decorator/ValidateWebSocketDto.decorator';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chat: ChatService) {}

  @SubscribeMessage('newMessage')
  async handleEvent(@ValidateAndTransformWebSocketDto(SendMessageDto) dto: SendMessageDto) {
    console.log('dto', dto);
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
