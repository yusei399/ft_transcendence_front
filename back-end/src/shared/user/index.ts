import {UserEditEndPoint} from './edit';

export * from './edit';

export const UserEndPointBase = 'user';
export const UserEndPoints = {
  edit: `${UserEndPointBase}/${UserEditEndPoint}`,
};
