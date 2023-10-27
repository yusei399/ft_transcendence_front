import {ConflictException, Injectable} from '@nestjs/common';
import {EditUserDto} from './dto';
import * as argon from 'argon2';
import {PrismaService} from 'src/prisma/prisma.service';
import {CreateUserTemplate, GetUserById, GetUserTemplate} from './interface';
import {User} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editUserInfo(userInfo: GetUserById, dto: EditUserDto) {
    try {
      if (dto.password) dto.password = await argon.hash(dto.password);
      const userModelInfo = {email: dto.email, password: dto.password};
      const profileModelInfo = {nickname: dto.nickname, avatarUrl: dto.avatarUrl};
      return await this.prisma.user.update({
        where: {...userInfo},
        include: {profile: true},
        data: {
          ...userModelInfo,
          profile: {update: {...profileModelInfo}},
        },
      });
    } catch (err) {
      if (err.code === 'P2002')
        throw new ConflictException(
          `unable to update the field ${err.meta.target} because the value is not available`,
        );
    }
  }

  async getUser(userInfo: GetUserTemplate) {
    if ('nickname' in userInfo) {
      return await this.prisma.user.findFirst({
        where: {profile: {nickname: userInfo.nickname}},
        include: {profile: true},
      });
    }
    return await this.prisma.user.findUnique({where: {...userInfo}, include: {profile: true}});
  }

  removeUserPrivateInfoFromProfile(profile: User) {
    delete profile.password;
    delete profile.user42Id;
    return profile;
  }

  async getUserPublicProfile(userInfo: GetUserTemplate) {
    const profile = await this.getUser(userInfo);
    return profile; //this.removeUserPrivateInfoFromProfile(profile);
  }

  async createUser(dto: CreateUserTemplate) {
    try {
      if ('password' in dto) {
        dto.password = await argon.hash(dto.password);
      }
      const {nickname, avatarUrl, ...userInfo} = dto;
      return await this.prisma.user.create({
        data: {
          ...userInfo,
          profile: {create: {nickname, avatarUrl}},
        },
        include: {profile: true},
      });
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
