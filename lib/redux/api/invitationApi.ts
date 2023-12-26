import {HttpInvitation} from '@/shared/HttpEndpoints/';
import {backEndApi} from './api';
import {createMutation} from './utils';

const invitationApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    sendInvitation: createMutation(build, HttpInvitation.sendInvitation.requestSender, [
      'Invitation',
    ]),
    updateInvitation: createMutation(build, HttpInvitation.updateInvitation.requestSender, [
      'Invitation',
    ]),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {useSendInvitationMutation, useUpdateInvitationMutation} = invitationApi;
