import {SubscribeMessage, WebSocketGateway, WsException} from '@nestjs/websockets';
import {SendMessageDto} from './dto';
import {ChatService} from './chat.service';
import {ValidateAndTransformWebSocketDto} from 'src/decorator/ValidateWebSocketDto.decorator';
import {sendMessageEventName} from 'src/shared/WsEvents/chat';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chat: ChatService) {}

  @SubscribeMessage(sendMessageEventName)
  async handleEvent(@ValidateAndTransformWebSocketDto(SendMessageDto) dto: SendMessageDto) {
    try {
      return await this.chat.sendMessage(dto);
    } catch (err) {
      throw err instanceof WsException ? err : new WsException(`bad request`);
    }
  }
}
