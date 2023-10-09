import { ConflictException, Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editUserInfo(id: number, dto: EditUserDto) {
    try {
      return await this.prisma.user.update({ where: { id }, data: { ...dto } });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException(`unable to update the field ${err.meta.target} because the value is not available`);
    }
  }
}
