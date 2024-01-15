import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './utils';

export type TagType =
  | 'User'
  | 'OtherUsers'
  | 'Friend'
  | 'ChatOverView'
  | 'ChatInfo'
  | 'DirectMessage'
  | 'Invitation';
const tagTypes = [
  'User',
  'OtherUsers',
  'Friend',
  'ChatOverView',
  'ChatInfo',
  'DirectMessage',
  'Invitation',
] as const;

export const backEndApi = createApi({
  reducerPath: 'backEndApi',
  baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:3333'}),
  tagTypes,
  endpoints: build => ({}),
});
