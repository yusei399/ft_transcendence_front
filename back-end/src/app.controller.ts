import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/';
import { AppService } from './app.service';
import { FortyTwoProfileDto } from './auth/dto';
import { GetUser } from './auth/decorator';

@Controller()
@UseGuards(JwtAuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@GetUser() user: FortyTwoProfileDto): string {
    return this.appService.getHello();
  }
}
