import {Http} from '@/shared/HttpEndpoints';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosBaseQuery, BuilderType, CstrArgs, ReqSenderCstr, TRes} from './types';
import {RootState} from '../../store';
import {TagType} from '../api';
import {HttpRefresh} from '@/shared/HttpEndpoints/auth';
import {filterDefinedProperties} from '@/shared/sharedUtilities/utils.functions.';

const hasFile = (obj: Object): boolean => {
  for (const value of Object.values(obj)) {
    if (value instanceof File) return true;
  }
  return false;
};

export const axiosBaseQuery =
  ({baseUrl}: {baseUrl: string} = {baseUrl: ''}): AxiosBaseQuery =>
  async ({endpoint, method, req, resCtr}: Http.requestSender, api) => {
    const options: AxiosRequestConfig<Http.reqTemplate> = {
      method: method,
      baseURL: baseUrl,
      url: endpoint,
      data: filterDefinedProperties(req),
      headers: {'Content-Type': 'application/json'},
    };
    if (hasFile(req)) {
      options.headers = {'Content-Type': 'multipart/form-data'};
      const formData = new FormData();
      for (const [key, value] of Object.entries(filterDefinedProperties(req))) {
        formData.append(key, value);
      }
      options.data = formData;
    }

    const authToken = (api.getState() as RootState).auth.authToken;
    if (authToken) options.headers = {...options.headers, Authorization: `Bearer ${authToken}`};

    try {
      const res = await axios<Http.reqTemplate, AxiosResponse<InstanceType<typeof resCtr>>>(
        options,
      );
      const data = res.data;
      return {data};
    } catch (err) {
      console.log(err);
      if (!axios.isAxiosError(err)) return {error: {data: 'Unknown error', status: 400}};
      if (
        authToken &&
        err.response?.status === 401 &&
        err.response?.data?.name === 'TokenExpiredError'
      ) {
        const refreshConfig = {
          method: HttpRefresh.method,
          baseURL: baseUrl,
          url: HttpRefresh.endPointFull,
          data: {refreshToken: (api.getState() as RootState).auth.refreshToken, authToken},
          headers: {'Content-Type': 'application/json'},
        };
        try {
          const res = await axios<HttpRefresh.reqTemplate, AxiosResponse<HttpRefresh.resTemplate>>(
            refreshConfig,
          );
          api.dispatch({type: 'auth/login', payload: res.data});
          options.headers = {...options.headers, Authorization: `Bearer ${res.data.authToken}`};
          const resRetry = await axios<
            Http.reqTemplate,
            AxiosResponse<InstanceType<typeof resCtr>>
          >(options);
          const data = resRetry.data;
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
      } else if (authToken && err.response?.status === 401) {
        api.dispatch({type: 'auth/logout'});
        return {error: {data: 'invalid token', status: 401}};
      }
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
