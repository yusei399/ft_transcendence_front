import {Module} from '@nestjs/common';
import {InvitationsService} from './invitation.service';
import {ChatModule} from 'src/chat/chat.module';
import {RelationshipModule} from 'src/relationship/relationship.module';
import {InvitationController} from './invitation.controller';

@Module({
  imports: [ChatModule, RelationshipModule],
  providers: [InvitationsService],
  controllers: [InvitationController],
  exports: [InvitationsService],
})
export class InvitationModule {}
