import {Module} from '@nestjs/common';
import {ChatService} from './chat.service';
import {ChatGateway} from './chat.gateway';
import {ChatController} from './chat.controller';
import {AuthModule} from 'src/auth/auth.module';
import {RoomMonitorModule} from 'src/webSocket/room/roomMonitor.module';

@Module({
  imports: [AuthModule, RoomMonitorModule],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
