import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { TokenResponseDto, FortyTwoProfileDto } from './dto';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    // private httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  // generateState(length: number): string {
  //   return crypto.randomBytes(length).toString('hex');
  // }

  // async exchangeCodeForToken(code: string): Promise<TokenResponseDto> {
  //   const clientId = process.env.OAUTH42_CLIENT_ID;
  //   const clientSecret = process.env.OAUTH42_SECRET;
  //   const redirectUri = process.env.OAUTH42_REDIRECT_URI;
  //   const tokenUrl = 'https://api.intra.42.fr/oauth/token';

  //   const formData = {
  //     grant_type: 'authorization_code',
  //     client_id: clientId,
  //     client_secret: clientSecret,
  //     code: code,
  //     redirect_uri: redirectUri,
  //   };
  //   try {
  //     const response = this.httpService.post<TokenResponseDto>(tokenUrl, formData);
  //     return (await firstValueFrom(response)).data;
  //   } catch (err) {
  //     throw new UnauthorizedException();
  //   }
  // }

  // async getUserInfo(accessToken: string): Promise<FortyTwoProfileDto> {
  //   const userInfoUrl = 'https://api.intra.42.fr/v2/me';

  //   try {
  //     const headers = {
  //       Authorization: `Bearer ${accessToken}`,
  //     };

  //     const response = this.httpService.get(userInfoUrl, { headers });
  //     const userInfo: FortyTwoProfileDto = (await firstValueFrom(response)).data;
  //     return userInfo;
  //   } catch (error) {
  //     throw new ForbiddenException(
  //       'Unable to retrieve users informations from 42 Oauth API',
  //     );
  //   }
  // }

  async createAuthToken(user: FortyTwoProfileDto): Promise<string> {
    const id = (await this.prisma.user.findUnique({ where: { id42: user.id } })).id;
    const tokenData = {
      id: id,
    };
    return jwt.sign(tokenData, process.env.JWT_KEY);
  }
}
