import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editUserInfo(id: number, dto: EditUserDto) {
    return await this.prisma.user.update({ where: { id }, data: { ...dto } });
  }
}
