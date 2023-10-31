import {UserPublicProfile} from '../../base_interfaces';

/****************DELETE****************/
export const RemoveFriendEndPoint = 'remove';

export interface RemoveFriendData {
  friendId: number;
}

export type RemoveFriendResponse = UserPublicProfile[];
