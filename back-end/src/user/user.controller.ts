import {Body, Controller, Get, Patch, UnprocessableEntityException, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard';
import {EditUserDto} from './dto';
import {UserService} from './user.service';
import {GetInfoFromJwt} from 'src/decorator';
import {UserMeEndPoint, UserMeUserResponse} from 'src/shared/user/me';
import {UserEditEndPoint, UserEditUserResponse, UserEndPointBase} from 'src/shared/user';

@Controller(UserEndPointBase)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(UserMeEndPoint)
  async getMe(@GetInfoFromJwt('userId') userId: number): Promise<UserMeUserResponse> {
    return await this.userService.getUserPublicProfile({userId});
  }

  @Patch(UserEditEndPoint)
  async editProfile(
    @GetInfoFromJwt('userId') userId: number,
    @Body() dto: EditUserDto,
  ): Promise<UserEditUserResponse> {
    if (!Object.keys(dto).length) throw new UnprocessableEntityException('no data to update');
    const userProfile = await this.userService.editUserInfo({userId}, dto);
    return userProfile; //this.userService.removeUserPrivateInfoFromProfile(userProfile);
  }
}
