import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {PrismaModule} from './prisma/prisma.module';
import {UserModule} from './user/user.module';
import {ChatModule} from './chat/chat.module';
import {RelationshipModule} from './relationship/relationship.module';
import {InvitationModule} from './invitation/invitation.module';
import {WebSocketModule} from './webSocket/websocket.module';
import {RoomMonitorModule} from './webSocket/room/roomMonitor.module';
import {ConnectionMonitorModule} from './webSocket/connection/connectionMonitor.module';
import {InterceptorsModule} from './interceptor/interceptor.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PrismaModule,
    InterceptorsModule,
    WebSocketModule,
    RoomMonitorModule,
    ConnectionMonitorModule,
    AuthModule,
    UserModule,
    ChatModule,
    InvitationModule,
    RelationshipModule,
  ],
})
export class AppModule {}
