import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './utils';

export type TagType = 'User' | 'Friend' | 'Chat' | 'Invitation';
const tagTypes = ['User', 'Friend', 'Chat', 'Invitation'] as const;

export const backEndApi = createApi({
  reducerPath: 'backEndApi',
  baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:3333'}),
  tagTypes,
  endpoints: build => ({}),
});
