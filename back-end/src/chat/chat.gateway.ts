import {SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {SendMessageDto} from './dto';
import {ChatService} from './chat.service';
import {WsDtoPipe} from 'src/decorator/ValidateWebSocketDto.decorator';
import {OnSendMessageEvent, sendMessageEventName} from 'src/shared/WsEvents/chat';
import {GetInfoFromJwt} from 'src/decorator';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chat: ChatService) {}

  @SubscribeMessage(sendMessageEventName)
  async onNewMessage(
    @GetInfoFromJwt('userId') userId: number,
    @WsDtoPipe(SendMessageDto) dto: SendMessageDto,
  ): Promise<WsResponse<OnSendMessageEvent>> {
    const message = await this.chat.sendMessage(userId, dto);
    return {'event':'newMessage', data:message}
  }
}

