import {Module} from '@nestjs/common';
import {WebSocketValidationInterceptor} from './WebSocket.interceptor';

@Module({
  providers: [WebSocketValidationInterceptor],
  exports: [WebSocketValidationInterceptor],
})
export class InterceptorsModule {}
