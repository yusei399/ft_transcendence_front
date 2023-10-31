import {ChatInfo} from '../../base_interfaces/';
import {
  InvitationAction_Url,
  InvitationKind,
  InvitationKind_Url,
  InvitationStatus,
} from '../../base_types';

/****************POST****************/
export const UpdateInvitationEndPoint_NEST = '/:kind/:action/:invitationId';
export const UpdateInvitationEndPoint = (
  kind: InvitationKind_Url,
  action: InvitationAction_Url,
  id: number,
) => {
  `${kind}/${action}/${id}`;
};

export interface UpdateInvitationData {}

export interface UpdateInvitationReponse {
  invitationId: number;
  senderId: number;
  receiverId: number;
  status: InvitationStatus;
  kind: InvitationKind;
  targetChat?: ChatInfo;
  targetGameId?: number;
}
