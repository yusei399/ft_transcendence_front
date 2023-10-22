import {Module} from '@nestjs/common';
import {SocketMonitorGateway} from './websocket.gateway';
import {AuthModule} from 'src/auth/auth.module';
import {RoomMonitorModule} from './room/roomMonitor.module';
import {ConnectionMonitorModule} from './connection/connectionMonitor.module';

@Module({
  imports: [AuthModule, RoomMonitorModule, ConnectionMonitorModule],
  providers: [SocketMonitorGateway],
})
export class WebSocketModule {}
