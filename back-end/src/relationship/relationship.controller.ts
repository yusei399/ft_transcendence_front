import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard';
import {RelationshipService} from './relationship.service';
import {GetInfoFromJwt} from 'src/decorator';

@Controller('relationship')
@UseGuards(JwtAuthGuard)
export class RelationshipController {
  constructor(private readonly relationship: RelationshipService) {}

  @Get()
  getUserRelationship(@GetInfoFromJwt('userId') userId: number) {
    return this.relationship.getUserFriendList(userId);
  }
}
