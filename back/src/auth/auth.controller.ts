import {
	Controller,
	Post,
	Body,
	Get,
	UseGuards,
	Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';


@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.auth.signUp(dto);
  }

	// @Post('login')
	// async login(@Body() authDto: AuthDto): Promise<Csrf> {
	// 	return this.auth.login(authDto);
	// }

	// @Get('csrf')
	// async csrf(@Req() req: request, @Res() res: response): Promise<Csrf> {
	// 	return this.auth.csrf(req, res);
	// }
}