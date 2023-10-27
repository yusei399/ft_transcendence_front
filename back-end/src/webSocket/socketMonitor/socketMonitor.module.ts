import {Module} from '@nestjs/common';
import {SocketMonitorService} from './socketMonitor.service';

@Module({
  providers: [SocketMonitorService],
  exports: [SocketMonitorService],
})
export class SocketMonitorModule {}
