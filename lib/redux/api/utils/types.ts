/* eslint-disable @typescript-eslint/no-explicit-any */
import {Http} from '@/shared/HttpEndpoints';
import {ARequestSender} from '@/shared/HttpEndpoints/interfaces/ARequestSender';
import {BaseQueryFn} from '@reduxjs/toolkit/dist/query';
import {EndpointBuilder} from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {TagType} from '../api';

export type ErrorType = {status: number; data: string};
export type AxiosBaseQuery = BaseQueryFn<Http.requestSender, Http.resTemplate, ErrorType>;

export type CstrArgs<T extends new (...args: unknown[]) => Http.requestSender> = T extends new (
  ...args: infer P
) => unknown
  ? P
  : never;

export type TRes<T extends new (...args: unknown[]) => ARequestSender<any, any>> = T extends new (
  ...args: unknown[]
) => ARequestSender<any, infer R>
  ? R
  : never;

export type BuilderType = EndpointBuilder<AxiosBaseQuery, TagType, 'backEndApi'>;
export type ReqSenderCstr = new (...args: unknown[]) => Http.requestSender;
