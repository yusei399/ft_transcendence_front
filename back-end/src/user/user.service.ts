import {ConflictException, Injectable} from '@nestjs/common';
import {EditUserDto} from './dto';
import * as argon from 'argon2';
import {PrismaService} from 'src/prisma/prisma.service';
import {GetUserTemplate, CreateUserTemplate} from './interface';
import {User} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editUserInfo(userInfo: GetUserTemplate, dto: EditUserDto) {
    try {
      return await this.prisma.user.update({where: {...userInfo}, data: {...dto}});
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException(
          `unable to update the field ${err.meta.target} because the value is not available`,
        );
    }
  }

  async getUser(userInfo: GetUserTemplate) {
    return await this.prisma.user.findUnique({where: {...userInfo}});
  }

  removeUserPrivateInfoFromProfile(profile: User) {
    delete profile.password;
    delete profile.user42Id;
    return profile;
  }

  async getUserPublicProfile(userInfo: GetUserTemplate) {
    const profile = await this.getUser(userInfo);
    return this.removeUserPrivateInfoFromProfile(profile);
  }

  async createUser(userInfo: CreateUserTemplate) {
    try {
      if ('password' in userInfo) {
        userInfo.password = await argon.hash(userInfo.password);
      }
      return await this.prisma.user.create({data: {...userInfo}});
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException(`unable to create the user. ${err.meta.target} is not available`);
    }
  }

  async getOrCreateUser(getInfo: GetUserTemplate, createInfo: CreateUserTemplate) {
    let user = await this.getUser(getInfo);
    if (!user) user = await this.createUser(createInfo);
    return user;
  }
}
