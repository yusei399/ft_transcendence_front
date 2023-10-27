import {Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {FortyTwoAuthGuard} from './guard';
import {SignInDto, SignUpDto} from './dto';
import {
  AuthEndPointBase,
  AuthSignInEndPoint,
  AuthSignInResponse,
  AuthSignUpEndPoint,
  AuthSignUpResponse,
  Auth42CBEndPoint,
  Auth42EndPoint,
  Auth42Response,
} from 'src/shared/HttpEndpoints/auth';

@Controller(AuthEndPointBase)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get(Auth42EndPoint)
  @UseGuards(FortyTwoAuthGuard)
  redirectTo42Auth(): never {
    throw new UnauthorizedException('Should not be here');
  }

  @Get(Auth42CBEndPoint)
  @UseGuards(FortyTwoAuthGuard)
  async handle42Callback(@Req() req): Promise<Auth42Response> {
    const authToken = await this.authService.createAuthToken(req.user);
    return {authToken};
  }

  @Post(AuthSignUpEndPoint)
  async signup(@Body() dto: SignUpDto): Promise<AuthSignUpResponse> {
    return this.authService.signup(dto);
  }

  @Post(AuthSignInEndPoint)
  async signin(@Body() dto: SignInDto): Promise<AuthSignInResponse> {
    const authToken = await this.authService.signin(dto);
    return {authToken};
  }
}
