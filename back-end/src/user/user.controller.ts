import {Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard';
import {EditUserDto} from './dto';
import {UserService} from './user.service';
import {GetInfoFromJwt} from 'src/decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getMe(@GetInfoFromJwt('userId') userId: number) {
    return await this.userService.getUserPublicProfile({userId});
  }

  @Patch('edit')
  async editProfile(@GetInfoFromJwt('userId') userId: number, @Body() dto: EditUserDto) {
    const userProfile = await this.userService.editUserInfo({userId}, dto);
    return this.userService.removeUserPrivateInfoFromProfile(userProfile);
  }
}
