import {WsEventName} from 'src/shared/base_types';

export interface SendWsMessageToClient {
  userId: number;
  eventName: WsEventName;
  message: unknown;
}
