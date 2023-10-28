import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-42';
import {UserService} from 'src/user/user.service';
import {FortyTwoProfile} from '../interface';
import {PrismaUser} from 'src/prisma/interfaces';
import {UserPublicProfile} from 'src/shared/base_interfaces';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.OAUTH42_CLIENT_ID,
      clientSecret: process.env.OAUTH42_SECRET,
      callbackURL: process.env.OAUTH42_REDIRECT_URI,
      profileFields: {
        id: 'id',
        username: 'login',
        email: 'email',
      },
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any): Promise<UserPublicProfile> {
    const userInfo: FortyTwoProfile = {...profile?._json};
    if (!userInfo?.id) throw new UnauthorizedException('Id is missing in the user profile.');
    try {
      const user = await this.userService.getOrCreateUser(
        {user42Id: userInfo.id},
        {user42Id: userInfo.id, email: userInfo.email, nickname: userInfo.login},
      );
      return user;
    } catch (err) {
      if (err instanceof HttpException) throw err;
      throw new UnauthorizedException(err);
    }
  }
}
