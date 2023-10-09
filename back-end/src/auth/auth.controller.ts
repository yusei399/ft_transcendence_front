import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { FortyTwoAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('42')
  @UseGuards(FortyTwoAuthGuard) // Utilisez les deux guards
  async getProfile(@Req() req, @Res() res) {
    // Cette route est protégée par Passport-42 et votre custom FortyTwoAuthGuard
    // Vous pouvez accéder aux informations de l'utilisateur authentifié via req.user
    return req.user;
  }

  @Get('42/cb')
  @UseGuards(FortyTwoAuthGuard)
  async handle42Callback(@Req() req, @Res() res) {
    const authToken = await this.authService.createAuthToken(req.user);
    res.json({ token: authToken });
  }
  // @Get('42')
  // redirectTo42Authorization(@Res() res: Response) {
  //   const clientId = process.env.OAUTH42_CLIENT_ID;
  //   const redirectUri = process.env.OAUTH42_REDIRECT_URI;
  //   const responseType = 'code';
  //   const state = this.authService.generateState(64);
  //   const endPoint = 'https://api.intra.42.fr/oauth/authorize';
  //   const authorizationUrl = `${endPoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //     redirectUri,
  //   )}&response_type=${responseType}&state=${state}`;
  //   return res.redirect(authorizationUrl);
  // }

  // @Get('42/cb')
  // @UseGuards(FortyTwoAuthGuard)
  // async handle42Callback(@Query('code') code: string, @Res() res: Response) {
  //   const tokenResponse = await this.authService.exchangeCodeForToken(code);
  //   const user = await this.authService.getUserInfo(tokenResponse.access_token);
  //   const authToken = this.authService.createAuthToken(user);
  //   res.json({ token: authToken });
  // }
}
