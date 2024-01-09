/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {InvitationKind} from '@/shared/HttpEndpoints/types';

interface InvitationSliceState {
  invitationKindToRefresh?: InvitationKind;
  eventToHandle?: boolean;
}

const initialState: InvitationSliceState = {
  invitationKindToRefresh: undefined,
  eventToHandle: undefined,
};

const invitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    refreshInvitation: (
      state,
      action: PayloadAction<InvitationSliceState['invitationKindToRefresh']>,
    ) => {
      state.invitationKindToRefresh = action.payload;
      state.eventToHandle = true;
    },
    clearEventToHandle: state => {
      state.eventToHandle = undefined;
    },
    clearInvitationToRefresh: state => {
      state.invitationKindToRefresh = undefined;
    },
  },
});

export const {refreshInvitation, clearInvitationToRefresh, clearEventToHandle} =
  invitationSlice.actions;
export const invitationSelector = (state: RootState) => state.invitation;
export const invitationToRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh;
export const needFriendInvitationRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'FRIEND';
export const needGameInvitationRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'GAME';
export const needChatInvitationRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'CHAT';
export const eventToHandleSelector = (state: RootState) => state.invitation.eventToHandle;
export const friendEventToHandleSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'FRIEND' && state.invitation.eventToHandle;
export const gameEventToHandleSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'GAME' && state.invitation.eventToHandle;
export const chatEventToHandleSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'CHAT' && state.invitation.eventToHandle;
export default invitationSlice.reducer;
