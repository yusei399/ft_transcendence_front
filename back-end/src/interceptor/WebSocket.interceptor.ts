import {Injectable, NestInterceptor} from '@nestjs/common';
import {WsException} from '@nestjs/websockets';
import {classToPlain} from 'class-transformer';
import {validate} from 'class-validator';
import {JoinChatRoomDto, SendMessageDto} from 'src/chat/dto';

@Injectable()
export class WebSocketValidationInterceptor implements NestInterceptor {
  async intercept(context, next) {
    const client = context.switchToWs().getClient();
    const data = context.getArgs()[1];
    if (data instanceof SendMessageDto) {
      const dto = new SendMessageDto();
      Object.assign(dto, classToPlain(data));
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new WsException(errors);
      }
      return next.handle();
    } else {
      throw new WsException('bad request');
    }
  }
}
