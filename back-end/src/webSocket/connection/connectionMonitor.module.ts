import {Module} from '@nestjs/common';
import {ConnectionMonitorService} from './connectionMonitor.service';
import {SocketMonitorModule} from '../socketMonitor/socketMonitor.module';
import {FriendModule} from 'src/friend/friend.module';

@Module({
  imports: [SocketMonitorModule, FriendModule],
  providers: [ConnectionMonitorService],
  exports: [ConnectionMonitorService],
})
export class ConnectionMonitorModule {}
