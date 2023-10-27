/****************GET****************/
export const Auth42EndPoint = '42';
export const Auth42CBEndPoint = '42/cb';

/* /auth/42 -(redirect)-> API42 -(redirect)-> /auth/42/cb ⇩ response */
export interface Auth42Response {
  authToken: string;
}
