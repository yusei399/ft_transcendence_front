import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import {ChatService} from './chat.service';
import {GetInfoFromJwt} from 'src/decorator';
import {
  ChatGetAllMessagesEndPoint,
  ChatGetAllMessagesQuery,
  CreateChatEndPoint,
  CreateChatResponse,
  GetAllMessageResponse,
  GetChatInfoEndPoint,
  GetChatInfoResponse,
  JoinChatEndPoint_NEST,
  JoinChatParam,
  JoinChatRespone,
  LeaveChatEndPoint_NEST,
  LeaveChatParam,
  LeaveChatRespone,
  UpdateChatEndPoint_NEST,
  UpdateChatParam,
  UpdateChatRespone,
} from 'src/shared/HttpEndpoints/chat/';
import {ChatEndPointBase, GetChatInfoQuery} from 'src/shared/HttpEndpoints/chat';
import {CreateChatDto, JoinChatDto, UpdateChatDto} from './dto';
import {JwtAuthGuard} from 'src/auth/guard';

@Controller(ChatEndPointBase)
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Get(ChatGetAllMessagesEndPoint)
  async getAllMessage(
    @GetInfoFromJwt('userId') userId: number,
    @Query(ChatGetAllMessagesQuery.key, ParseIntPipe) chatId: number,
  ): Promise<GetAllMessageResponse> {
    return this.chat.getAllMessagesFromChatId(userId, chatId);
  }

  @Post(CreateChatEndPoint)
  async createChat(
    @GetInfoFromJwt('userId') userId: number,
    @Body() dto: CreateChatDto,
  ): Promise<CreateChatResponse> {
    return this.chat.createChatRoom(userId, dto);
  }

  @Get(GetChatInfoEndPoint)
  async getChatInfo(
    @Query(GetChatInfoQuery.key, ParseIntPipe) chatId: number,
  ): Promise<GetChatInfoResponse> {
    return this.chat.getChatInfo(chatId);
  }

  @Post(JoinChatEndPoint_NEST)
  async joinChat(
    @GetInfoFromJwt('userId') userId: number,
    @Param(JoinChatParam, ParseIntPipe) chatId: number,
    @Body() dto: JoinChatDto,
  ): Promise<JoinChatRespone> {
    await this.chat.joinChatRoom({userId, chatId, ...dto});
    return this.chat.getChatInfo(chatId);
  }

  @Post(LeaveChatEndPoint_NEST)
  async leaveChat(
    @GetInfoFromJwt('userId') userId: number,
    @Param(LeaveChatParam, ParseIntPipe) chatId: number,
  ): Promise<LeaveChatRespone> {
    await this.chat.leaveChatRoom({userId, chatId});
    return this.chat.getChatInfo(chatId);
  }

  @Patch(UpdateChatEndPoint_NEST)
  async updateChat(
    @GetInfoFromJwt('userId') userId: number,
    @Param(UpdateChatParam, ParseIntPipe) chatId: number,
    @Body() dto: UpdateChatDto,
  ): Promise<UpdateChatRespone> {
    if (!Object.keys(dto).length) throw new UnprocessableEntityException('no data to update');
    await this.chat.updateChat({...dto, userId, chatId});
    return this.chat.getChatInfo(chatId);
  }
}
