import {Body, Controller, Delete, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard';
import {FriendService} from './friend.service';
import {GetInfoFromJwt} from 'src/decorator';
import {
  FriendEndPointBase,
  GetFriendProfilesEndPoint,
  GetFriendProfilesResponse,
  RemoveFriendEndPoint,
  RemoveFriendResponse,
} from 'src/shared/HttpEndpoints/friend';
import {RemoveFriendDto} from './dto';

@Controller(FriendEndPointBase)
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private readonly friend: FriendService) {}

  @Get(GetFriendProfilesEndPoint)
  getUserFriendProfiles(
    @GetInfoFromJwt('userId') userId: number,
  ): Promise<GetFriendProfilesResponse> {
    return this.friend.getUserFriendProfilesList(userId);
  }

  @Delete(RemoveFriendEndPoint)
  deleteFriend(
    @GetInfoFromJwt('userId') userId: number,
    @Body() dto: RemoveFriendDto,
  ): Promise<RemoveFriendResponse> {
    return this.friend.unsetRelationship({userId, targetUserId: dto.friendId});
  }
}
