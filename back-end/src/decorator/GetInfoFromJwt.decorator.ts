import {ExecutionContext, UnauthorizedException, createParamDecorator} from '@nestjs/common';
import {WsException} from '@nestjs/websockets';
import {AuthService} from 'src/auth/auth.service';

export const GetInfoFromJwt = createParamDecorator(
  (data: 'userId' | 'nickname' | undefined, ctx: ExecutionContext) => {
    const ctxType = ctx.getType();
    let userInfo;
    if (ctxType === 'http') {
      userInfo = ctx.switchToHttp().getRequest()?.user;
      if (!userInfo) throw new UnauthorizedException('Jwt is missing');
    } else if (ctxType === 'ws') {
      const client = ctx.switchToWs().getClient();
      const token = client?.handshake?.auth?.token;
      if (!token) throw new WsException('Jwt is missing');
      userInfo = AuthService.verifyAndDecodeAuthToken(token, 'ws');
    }

    const value = data ? userInfo[data] : userInfo;
    if (!value && ctxType === 'http') throw new UnauthorizedException(`${data} is missing`);
    if (!value && ctxType === 'ws') throw new WsException(`${data} is missing`);
    return value;
  },
);
