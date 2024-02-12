import {Http} from '@/shared/HttpEndpoints';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosBaseQuery, BuilderType, CstrArgs, ReqSenderCstr, TRes} from './types';
import {RootState} from '../../store';
import {TagType} from '../api';
import {HttpAuth, HttpRefresh} from '@/shared/HttpEndpoints/auth';
import {filterDefinedProperties} from '@/shared/sharedUtilities/utils.functions.';
import {clearNotifications, clearRedirectTo, logout, refresh, resetCurrentGame} from '../../slices';
import {BaseQueryApi} from '@reduxjs/toolkit/query';

const hasFile = (obj: object): boolean => {
  for (const value of Object.values(obj)) {
    if (value instanceof File) return true;
  }
  return false;
};

const isAuthTokenRequired = (endpoint: string): boolean => {
  return !endpoint.startsWith(HttpAuth.endPointBase);
};

const sendRefreshRequest = async (
  api: BaseQueryApi,
  baseUrl: string,
  authToken: string,
  refreshToken: string,
) => {
  const refreshConfig = {
    method: HttpRefresh.method,
    baseURL: baseUrl,
    url: HttpRefresh.endPointFull,
    data: {refreshToken, authToken},
    headers: {'Content-Type': 'application/json'},
  };

  const res = await axios<HttpRefresh.reqTemplate, AxiosResponse<HttpRefresh.resTemplate>>(
    refreshConfig,
  );
  api.dispatch(refresh(res.data));
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

    const errorCausingLogout = (message: string, status: number) => {
      api.dispatch(clearRedirectTo());
      api.dispatch(resetCurrentGame());
      api.dispatch(clearNotifications());
      api.dispatch(logout());
      return {error: {data: message, status}};
    };

    let authToken = (api.getState() as RootState).auth.authToken;
    try {
      if (isAuthTokenRequired(endpoint)) {
        if (!authToken) return errorCausingLogout('no token', 401);
        if (authToken && authToken.expiresAt < Date.now()) {
          const refreshToken = (api.getState() as RootState).auth.refreshToken;
          if (!refreshToken || refreshToken.expiresAt < Date.now())
            return errorCausingLogout('no refresh token', 401);
          await sendRefreshRequest(api, baseUrl, authToken.token, refreshToken.token);
          authToken = (api.getState() as RootState).auth.authToken;
          if (!authToken || authToken.expiresAt < Date.now())
            return errorCausingLogout('invalid token', 401);
        }
        options.headers = {...options.headers, Authorization: `Bearer ${authToken.token}`};
      }

      const res = await axios<Http.reqTemplate, AxiosResponse<InstanceType<typeof resCtr>>>(
        options,
      );
      return {data: res.data};
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
