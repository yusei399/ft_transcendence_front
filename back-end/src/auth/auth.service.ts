import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtTokenPayload} from './interface';
import * as jwt from 'jsonwebtoken';
import {SignInDto, SignUpDto} from './dto';
import {UserService} from 'src/user/user.service';
import {AuthSignUpResponse} from 'src/shared/HttpEndpoints/auth';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createAuthToken(tokenData: JwtTokenPayload): Promise<string> {
    return jwt.sign(tokenData, process.env.JWT_KEY);
  }

  static verifyToken(authToken: string): boolean {
    try {
      jwt.verify(authToken, process.env.JWT_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  static decodeToken(authToken: string): JwtTokenPayload {
    const payload = jwt.decode(authToken) as JwtTokenPayload;
    return {userId: payload.userId, nickname: payload.nickname};
  }

  static verifyAndDecodeAuthToken(authToken: string, ctx: "http" | "ws" = "http"): JwtTokenPayload {
    if (this.verifyToken(authToken)) return this.decodeToken(authToken);
    if (ctx === 'http') throw new UnauthorizedException('invalid token');
    if (ctx === 'ws') throw new WsException('invalid token');
  }

  async signup(dto: SignUpDto): Promise<AuthSignUpResponse> {
    return await this.userService.createUser(dto);
  }

  async signin(dto: SignInDto): Promise<string> {
    const jwtPayload = await this.userService.verifyUserCredential(dto);
    return await this.createAuthToken(jwtPayload);
  }
}
