import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(cookieParser());
  // app.use(csurf({
  //   cookie: {
  //     httpOnly: true,
  //     secure: false,
  //     sameSite: 'none',
  //   },
  //   value: (req: Request) => {
  //     return req.header('csrf-token');
  //   },
  // }));
  await app.listen(process.env.PORT || 3005);
}
bootstrap();