import {
	Controller,
	Post,
	Body,
	HttpCode,
	HttpStatus,
	Res,
	Req,
	Get,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
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

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response,): Promise<Msg> {
	   const jwt = await this.auth.login(dto);
	   res.cookie('access_token', jwt.accessToken, { 
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/',
		});
		return { msg: 'login ok' };
	}

	@HttpCode(HttpStatus.OK)
	@Post('/logout')
	async logout(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response,): Promise<Msg> {
		const jwt = await this.auth.login(dto);
		res.cookie('access_token', '', { 
			httpOnly: true,
			secure: false,
			sameSite: 'none',
			path: '/',
		});
		return { msg: 'logout ok' };
	}
}