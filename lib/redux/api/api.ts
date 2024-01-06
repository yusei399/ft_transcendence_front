import {Action, PayloadAction} from '@reduxjs/toolkit/react';
import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './utils';
import {RootState} from '../store';
import {HYDRATE} from 'next-redux-wrapper';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export type TagType = 'User' | 'Friend' | 'Chat' | 'Invitation';
const tagTypes = ['User', 'Friend', 'Chat', 'Invitation'] as const;

export const backEndApi = createApi({
  reducerPath: 'backEndApi',
  baseQuery: axiosBaseQuery({baseUrl: 'http://localhost:3333'}),
  tagTypes,
  keepUnusedDataFor: 30,
  refetchOnReconnect: true,
  extractRehydrationInfo(action, {reducerPath}): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  endpoints: build => ({}),
});
