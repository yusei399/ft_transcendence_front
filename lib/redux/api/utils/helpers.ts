import {Http} from '@/shared/HttpEndpoints';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosBaseQuery, BuilderType, CstrArgs, ReqSenderCstr, TRes} from './types';
import {RootState} from '../../store';
import {TagType} from '../api';

export const axiosBaseQuery =
  ({baseUrl}: {baseUrl: string} = {baseUrl: ''}): AxiosBaseQuery =>
  async ({endpoint, method, req, resCtr}: Http.requestSender, api) => {
    const options: AxiosRequestConfig<Http.reqTemplate> = {
      method: method,
      baseURL: baseUrl,
      url: endpoint,
      data: req,
      headers: {'Content-Type': 'application/json'},
    };

    const jwt = (api.getState() as RootState).auth.jwt;
    if (jwt) options.headers = {...options.headers, Authorization: `Bearer ${jwt}`};

    try {
      const res = await axios<Http.reqTemplate, AxiosResponse<InstanceType<typeof resCtr>>>(
        options,
      );
      const data = res.data;
      return {data};
    } catch (err) {
      if (!axios.isAxiosError(err)) return {error: {data: 'Unknown error', status: 400}};
      return {
        error: {
          status: err.response?.status ?? 400,
          data: JSON.stringify(err.response?.data),
        },
      };
    }
  };

export const createMutation = <T extends ReqSenderCstr>(
  build: BuilderType,
  cstr: T,
  invalidatesTags?: TagType[],
) => {
  const query = (args: CstrArgs<T>) => new cstr(...args);
  return build.mutation<TRes<T>, CstrArgs<T>>({query, invalidatesTags});
};

export const createQuery = <T extends ReqSenderCstr>(
  build: BuilderType,
  cstr: T,
  providesTags?: TagType[],
) => {
  const query = (args: CstrArgs<T>) => new cstr(...args);
  return build.query<TRes<T>, CstrArgs<T>>({query, providesTags});
};
