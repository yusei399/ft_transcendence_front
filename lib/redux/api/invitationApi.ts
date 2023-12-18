import {HttpInvitation} from '@/shared/HttpEndpoints/';
import {backEndApiSlice} from './apiSlice';
import {createMutation} from './utils';

const invitationApi = backEndApiSlice.injectEndpoints({
  endpoints: build => ({
    sendInvitation: createMutation(build, HttpInvitation.sendInvitation.requestSender),
    updateInvitation: createMutation(build, HttpInvitation.updateInvitation.requestSender),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {useSendInvitationMutation, useUpdateInvitationMutation} = invitationApi;
