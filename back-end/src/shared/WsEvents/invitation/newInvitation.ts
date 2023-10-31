import {InvitationEventName, InvitationKind, InvitationStatus} from '../../base_types';

export const newInvitationEventName: InvitationEventName = 'newInvitation';

export interface OnNewInvitationEvent {
  invitationId: number;
  senderId: number;
  receiverId: number;
  status: InvitationStatus;
  kind: InvitationKind;
}
