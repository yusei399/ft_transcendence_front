import {Http} from '@/shared/HttpEndpoints';
import axios, {AxiosRequestConfig} from 'axios';
import {AxiosBaseQuery, BuilderType, CstrArgs, ReqSenderCstr, TRes} from './types';
import {RootState} from '../../store';

export const axiosBaseQuery =
  ({baseUrl}: {baseUrl: string} = {baseUrl: ''}): AxiosBaseQuery =>
  async ({endpoint, method, req, resCtr}: Http.requestSender, api) => {
    const {getState} = api;
    const options: AxiosRequestConfig = {
      method: method,
      baseURL: baseUrl,
      url: endpoint,
      data: req,
      headers: {'Content-Type': 'application/json'},
    };
    const {jwt} = (getState() as RootState).auth;
    if (jwt) options.headers = {...options.headers, Authorization: `Bearer ${jwt}`};
    try {
      const res = await axios(options);
      const data = res.data as InstanceType<typeof resCtr>;
      return {data};
    } catch (err) {
      if (!axios.isAxiosError(err)) return {error: {data: 'Unknown error', status: 400}};
      return {
        error: {
          status: err.response?.status ?? 400,
          data: err.response?.data?.message ?? 'Unknown error',
        },
      };
    }
  };

export const createMutation = <T extends ReqSenderCstr>(build: BuilderType, cstr: T) => {
  const query = (args: CstrArgs<T>) => new cstr(...args);
  return build.mutation<TRes<T>, CstrArgs<T>>({query});
};

export const createQuery = <T extends ReqSenderCstr>(build: BuilderType, cstr: T) => {
  const query = (args: CstrArgs<T>) => new cstr(...args);
  return build.query<TRes<T>, CstrArgs<T>>({query});
};
