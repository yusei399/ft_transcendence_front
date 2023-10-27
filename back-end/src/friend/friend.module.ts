import {Module} from '@nestjs/common';
import {FriendService} from './friend.service';
import {FriendController} from './friend.controller';
import {UserModule} from 'src/user/user.module';
import {RoomMonitorModule} from 'src/webSocket/room/roomMonitor.module';

@Module({
  imports: [RoomMonitorModule, UserModule],
  providers: [FriendService],
  exports: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
