import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma/prisma.module';
import {UserModule} from './user/user.module';
import {ChatModule} from './chat/chat.module';
import {InvitationModule} from './invitation/invitation.module';
import {WebSocketModule} from './webSocket/websocket.module';
import {ConnectionMonitorModule} from './webSocket/connection/connectionMonitor.module';
import {SocketMonitorModule} from './webSocket/socketMonitor/socketMonitor.module';
import {FriendModule} from './friend/friend.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    WebSocketModule,
    SocketMonitorModule,
    ConnectionMonitorModule,
    AuthModule,
    UserModule,
    ChatModule,
    InvitationModule,
    FriendModule,
  ],
})
export class AppModule {}
