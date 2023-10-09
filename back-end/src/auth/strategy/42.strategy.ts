import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly prisma: PrismaService) {
    super({
      clientID: process.env.OAUTH42_CLIENT_ID,
      clientSecret: process.env.OAUTH42_SECRET,
      callbackURL: process.env.OAUTH42_REDIRECT_URI,
      profileFields: {
        id: 'id',
        username: 'login',
        email: 'email',
        avatarUrl: 'image_url',
      },
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    const userInfo = profile?._json;
    if (!userInfo.id)
      throw new UnauthorizedException('Id is missing in the user profile.');

    try {
      const isRegistred = await this.prisma.user.findUnique({
        where: { id42: userInfo.id },
      });
      if (!isRegistred) {
        await this.prisma.user.create({
          data: {
            id42: userInfo.id,
            email: userInfo.email,
          },
        });
      }
    } catch (err) {
      throw new UnauthorizedException(err);
    }
    return profile;
  }
}
