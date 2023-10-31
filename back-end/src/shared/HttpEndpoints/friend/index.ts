import {GetFriendProfilesEndPoint} from './GetFriend';
import {RemoveFriendEndPoint} from './RemoveFriend';

export * from './GetFriend';
export * from './RemoveFriend';

export const FriendEndPointBase = 'friend';
export const FriendEndPoints = {
  getFriendProfiles: `${FriendEndPointBase}/${GetFriendProfilesEndPoint}`,
  removeFriend: `${FriendEndPointBase}/${RemoveFriendEndPoint}`,
};
