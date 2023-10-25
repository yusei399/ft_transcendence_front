import {Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {FortyTwoAuthGuard} from './guard';
import {SignInDto, SignUpDto} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('42')
  @UseGuards(FortyTwoAuthGuard)
  redirectTo42Auth() {
    throw new UnauthorizedException('Should not be here');
  }

  @Get('42/cb')
  @UseGuards(FortyTwoAuthGuard)
  async handle42Callback(@Req() req, @Res() res) {
    const authToken = await this.authService.createAuthToken(req.user);
    res.json({authToken});
  }

  @Post('signup')
  async signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SignInDto, @Res() res) {
    const user = await this.authService.signin(dto);
    const authToken = await this.authService.createAuthToken(user);
    res.json({authToken});
  }
}
