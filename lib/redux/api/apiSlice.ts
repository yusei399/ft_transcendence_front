import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from './utils';

export const backEndApiSlice = createApi({
  reducerPath: 'backEndApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:3333',
  }),
  endpoints: build => ({}),
});
