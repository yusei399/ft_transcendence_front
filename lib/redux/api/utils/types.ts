import {Http} from '@/shared/HttpEndpoints';
import {ARequestSender} from '@/shared/HttpEndpoints/interfaces/ARequestSender';
import {BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export type ErrorType = {status: number; data: string};
export type AxiosBaseQuery = BaseQueryFn<Http.requestSender, Http.resTemplate, ErrorType>;

export type CstrArgs<T extends new (...args: any[]) => Http.requestSender> = T extends new (
  ...args: infer P
) => any
  ? P
  : never;

export type TRes<T extends new (...args: any[]) => ARequestSender<any, any>> = T extends new (
  ...args: any[]
) => ARequestSender<any, infer R>
  ? R
  : never;

export type BuilderType = EndpointBuilder<AxiosBaseQuery, never, 'backEndApi'>;
export type ReqSenderCstr = new (...args: any[]) => Http.requestSender;
