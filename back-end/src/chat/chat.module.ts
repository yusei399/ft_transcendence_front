import {Module} from '@nestjs/common';
import {ChatService} from './chat.service';
import {ChatGateway} from './chat.gateway';
import {ChatController} from './chat.controller';
import {AuthModule} from 'src/auth/auth.module';
import {InterceptorsModule} from 'src/interceptor/interceptor.module';

@Module({
  imports: [InterceptorsModule, AuthModule],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
