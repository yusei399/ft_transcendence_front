import {JoinChatData} from 'src/shared/HttpEndpoints/chat/joinChat';

export class JoinChatDto implements JoinChatData {
  password?: string;
}
