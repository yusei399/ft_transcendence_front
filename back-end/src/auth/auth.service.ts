import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtTokenPayload} from './interface';
import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import {PrismaUser} from 'src/prisma/interfaces';
import {SignInDto, SignUpDto} from './dto';
import {UserService} from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createAuthToken(user: PrismaUser): Promise<string> {
    const tokenData: JwtTokenPayload = {userId: user.userId, nickname: user.nickname};
    return jwt.sign(tokenData, process.env.JWT_KEY);
  }

  static verifyToken(authToken: string) {
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

  static verifyAndDecodeAuthToken(authToken: string): JwtTokenPayload | undefined {
    if (this.verifyToken(authToken)) return this.decodeToken(authToken);
    throw new UnauthorizedException('invalid token');
  }

  async signup(dto: SignUpDto) {
    const user = await this.userService.createUser(dto);
    delete user.password;
    delete user.user42Id;
    return user;
  }

  async signin(dto: SignInDto): Promise<PrismaUser> {
    const user = await this.userService.getUser({nickname: dto.nickname});
    if (!user || !(await argon.verify(user.password, dto.password)))
      throw new UnauthorizedException('invalid credential');
    return user;
  }
}
