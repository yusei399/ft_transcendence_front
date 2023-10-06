import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { FortyTwoAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('42')
  redirectTo42Authorization(@Res() res: Response) {
    const clientId = process.env.OAUTH42_CLIENT_ID;
    const redirectUri = process.env.OAUTH42_REDIRECT_URI;
    const responseType = 'code';
    const scope = 'public';
    const state = this.authService.generateState(64);
    const endPoint = 'https://api.intra.42.fr/oauth/authorize';
    const authorizationUrl = `${endPoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=${responseType}&scope=${scope}&state=${state}`;
    return res.redirect(authorizationUrl);
  }

  @Get('42/cb')
  // @UseGuards(FortyTwoAuthGuard)
  async handle42Callback(@Query('code') code: string, @Res() res: Response) {
    const tokenResponse = await this.authService.exchangeCodeForToken(code);
    const user = await this.authService.getUserInfo(tokenResponse.access_token);
    const authToken = this.authService.createAuthToken(user);
    res.json({ token: authToken });
  }
}
