import {ExecutionContext, UnauthorizedException, createParamDecorator} from '@nestjs/common';

export const GetInfoFromJwt = createParamDecorator(
  (data: 'userId' | 'nickname' | undefined, ctx: ExecutionContext) => {
    const userInfo = ctx.switchToHttp().getRequest()?.user;
    const value = data ? userInfo[data] : userInfo;
    if (!value) throw new UnauthorizedException(`${data} is missing`);
    return value;
  },
);
