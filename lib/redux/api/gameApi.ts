import {backEndApi} from './api';
import {createMutation, createQuery} from './utils';
import {HttpGame} from '@/shared/HttpEndpoints/game';

const gameApi = backEndApi.injectEndpoints({
  endpoints: build => ({
    joinWaitList: createMutation(build, HttpGame.joinWaitList.requestSender, ['GameMatchMaking']),
    leaveGame: createMutation(build, HttpGame.leaveGame.requestSender, ['GameMatchMaking']),
    getMatchMakingInfo: createQuery(build, HttpGame.getMatchMakingInfo.requestSender, [
      'GameMatchMaking',
    ]),
    updateGameInCreation: createMutation(build, HttpGame.updateInCreation.requestSender, [
      'GameInCreation',
    ]),
    acceptGameInCreation: createMutation(build, HttpGame.acceptInCreation.requestSender, []),
    getGameInCreation: createQuery(build, HttpGame.getInCreation.requestSender, ['GameInCreation']),
  }),
  // @ts-ignore
  overrideExisting: module.hot?.status() === 'apply',
});

export const {
  useJoinWaitListMutation,
  useLeaveGameMutation,
  useGetMatchMakingInfoQuery,
  useUpdateGameInCreationMutation,
  useAcceptGameInCreationMutation,
  useGetGameInCreationQuery,
} = gameApi;
