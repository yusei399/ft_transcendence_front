import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('edit')
  async editProfile(@GetUser('id') id: number, @Body() dto: EditUserDto) {
    return (await this.userService.editUserInfo(id, dto));
  }
}
