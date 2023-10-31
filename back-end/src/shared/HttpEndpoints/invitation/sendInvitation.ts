import {ChatInfo} from '../../base_interfaces';
import {InvitationKind, InvitationKind_Url, InvitationStatus} from '../../base_types';

/****************POST****************/
export const SendInvitationEndPoint_NEST = '/:kind/send';
export const SendInvitationEndPoint = (kind: InvitationKind_Url) => {
  `${kind}/send`;
};

export interface SendFriendInvitationData {
  targetUserId: number;
}

export interface SendChatInvitationData {
  targetUserId: number;
  targetChatId: number;
}

export interface SendGameInvitationData {
  targetUserId: number;
  targetGameId: number;
}

export type SendInvitationData =
  | SendFriendInvitationData
  | SendChatInvitationData
  | SendGameInvitationData;

export interface SendInvitationReponse {
  invitationId: number;
  senderId: number;
  receiverId: number;
  status: InvitationStatus;
  kind: InvitationKind;
  targetChat?: ChatInfo;
  targetGameId?: number;
}
