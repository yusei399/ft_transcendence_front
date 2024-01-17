import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './utils';

export type TagType =
  | 'User'
  | 'OtherUsers'
  | 'Friend'
  | 'ChatOverView'
  | 'ChatInfo'
  | 'DirectMessage'
  | 'Invitation'
  | 'Game'
  | 'GameMatchMaking'
  | 'GameInCreation';
const tagTypes = [
  'User',
  'OtherUsers',
  'Friend',
  'ChatOverView',
  'ChatInfo',
  'DirectMessage',
  'Invitation',
  'Game',
  'GameMatchMaking',
  'GameInCreation',
] as const;

export const backEndApi = createApi({
  reducerPath: 'backEndApi',
  baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:3333'}),
  tagTypes,
  endpoints: build => ({}),
});
