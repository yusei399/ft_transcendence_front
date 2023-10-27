import {Module} from '@nestjs/common';
import {RoomMonitorService} from './roomMonitor.service';
import {SocketMonitorModule} from '../socketMonitor/socketMonitor.module';

@Module({
  imports: [SocketMonitorModule],
  providers: [RoomMonitorService],
  exports: [RoomMonitorService],
})
export class RoomMonitorModule {}
