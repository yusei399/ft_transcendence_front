import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { FortyTwoProfileDto } from '../dto';
import { AuthService } from '../auth.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly authService: AuthService) {
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
  validate(accessToken: string, refreshToken: string, profile: any): any {
    return profile;
  }
}
