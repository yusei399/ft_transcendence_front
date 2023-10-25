import {Module} from '@nestjs/common';
import {RelationshipModule} from 'src/relationship/relationship.module';
import {ConnectionMonitorService} from './connectionMonitor.service';
import {SocketMonitorModule} from '../socket/roomMonitor.module';

@Module({
  imports: [SocketMonitorModule, RelationshipModule],
  providers: [ConnectionMonitorService],
  exports: [ConnectionMonitorService],
})
export class ConnectionMonitorModule {}
