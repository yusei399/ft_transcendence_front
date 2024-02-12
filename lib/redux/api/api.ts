import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './utils';

const tagTypes = [
  'Auth',
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

export type TagType = (typeof tagTypes)[number];

export const backEndApi = createApi({
  reducerPath: 'backEndApi',
  baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:3333'}),
  tagTypes,
  endpoints: () => ({}),
});
