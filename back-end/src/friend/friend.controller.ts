import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard';
import {FriendService} from './friend.service';
import {GetInfoFromJwt} from 'src/decorator';

@Controller('friend')
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friend: FriendService) {}

  @Get()
  getUserRelationship(@GetInfoFromJwt('userId') userId: number) {
    return this.friend.getUserFriendProfilesList(userId);
  }
}
