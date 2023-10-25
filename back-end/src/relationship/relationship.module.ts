import {Module} from '@nestjs/common';
import {RelationshipService} from './relationship.service';
import {RoomMonitorModule} from 'src/webSocket/room/roomMonitor.module';
import {RelationshipController} from './relationship.controller';
import {UserModule} from 'src/user/user.module';

@Module({
  imports: [RoomMonitorModule, UserModule],
  providers: [RelationshipService],
  exports: [RelationshipService],
  controllers: [RelationshipController],
})
export class RelationshipModule {}
