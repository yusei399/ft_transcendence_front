import {UserEditEndPoint} from './edit';
import {UserMeEndPoint} from './me';

export * from './edit';
export * from './me';

export const UserEndPointBase = 'user';
export const UserEndPoints = {
  edit: `${UserEndPointBase}/${UserEditEndPoint}`,
  me: `${UserEndPointBase}/${UserMeEndPoint}`,
};
