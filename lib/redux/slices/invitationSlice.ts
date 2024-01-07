/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {InvitationKind} from '@/shared/HttpEndpoints/types';

interface InvitationSliceState {
  invitationKindToRefresh?: InvitationKind;
}

const initialState: InvitationSliceState = {
  invitationKindToRefresh: undefined,
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
    },
    clearInvitationToRefresh: state => {
      state.invitationKindToRefresh = undefined;
    },
  },
});

export const {refreshInvitation, clearInvitationToRefresh} = invitationSlice.actions;
export const invitationSelector = (state: RootState) => state.invitation;
export const invitationToRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh;
export const needFriendInvitationRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'FRIEND';
export const needGameInvitationRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'GAME';
export const needChatInvitationRefreshSelector = (state: RootState) =>
  state.invitation.invitationKindToRefresh === 'CHAT';
export default invitationSlice.reducer;
