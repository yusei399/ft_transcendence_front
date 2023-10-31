import {SendInvitationEndPoint} from './sendInvitation';
import {UpdateInvitationEndPoint} from './updateInvitation';
import {InvitationKind_Url, InvitationAction_Url} from '../../base_types';

export * from './sendInvitation';
export * from './updateInvitation';

export const InvitationEndPointBase = 'invitation';
export const InvitationEndPoints = {
  send: function (kind: InvitationKind_Url) {
    `${InvitationEndPointBase}${SendInvitationEndPoint(kind)}`;
  },
  update: function (kind: InvitationKind_Url, action: InvitationAction_Url, id: number) {
    `${InvitationEndPointBase}${UpdateInvitationEndPoint(kind, action, id)}`;
  },
};
