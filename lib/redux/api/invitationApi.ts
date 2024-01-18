import {HttpInvitation} from '@/shared/HttpEndpoints/';
import {backEndApi} from './api';
import {createMutation, createQuery} from './utils';

const invitationApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    sendInvitation: createMutation(build, HttpInvitation.sendInvitation.requestSender, [
      'Invitation',
    ]),
    updateInvitation: createMutation(build, HttpInvitation.updateInvitation.requestSender, [
      'Invitation',
    ]),
    getInvitations: createQuery(build, HttpInvitation.getInvitations.requestSender, ['Invitation']),
    getInvitationFromTo: createQuery(build, HttpInvitation.getInvitationsFromTo.requestSender, [
      'Invitation',
    ]),
  }),
  // @ts-expect-error
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useSendInvitationMutation,
  useUpdateInvitationMutation,
  useGetInvitationsQuery,
  useGetInvitationFromToQuery,
} = invitationApi;
