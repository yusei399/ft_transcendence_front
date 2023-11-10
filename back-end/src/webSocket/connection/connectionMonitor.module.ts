import {Module} from '@nestjs/common';
import {ConnectionMonitorService} from './connectionMonitor.service';
import {SocketMonitorModule} from '../socketMonitor/socketMonitor.module';
import {FriendModule} from 'src/friend/friend.module';
import {ChatModule} from 'src/chat/chat.module';

@Module({
  imports: [SocketMonitorModule, FriendModule, ChatModule],
  providers: [ConnectionMonitorService],
  exports: [ConnectionMonitorService],
})
export class ConnectionMonitorModule {}
