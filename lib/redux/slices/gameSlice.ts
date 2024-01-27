/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {
  Ball,
  GameRules,
  GameStatus,
  Player,
  UserPublicProfile,
} from '@/shared/HttpEndpoints/interfaces';
import {WsGameStateUpdatePosition} from '@/shared/WsEvents/game';

export type PlayerSide = {side: 'left' | 'right'};
export type GameData = {
  gameId: number;
  ball: Ball;
  me: Player & PlayerSide & {profile: UserPublicProfile};
  opponent: Player & PlayerSide & {profile: UserPublicProfile};
  status: Omit<GameStatus, 'IN_CREATION'> | 'WAIT_START';
  rules: GameRules;
  countdown?: number;
  startedAt: Date;
  endedAt?: Date;
  currentPlayerWin?: boolean;
};

export type SetUpCurrentGamePayload = {
  gameId: number;
  userId: number;
  player1: {score: number; profile: UserPublicProfile};
  player2: {score: number; profile: UserPublicProfile};
  status: Omit<GameStatus, 'IN_CREATION'>;
  rules: GameRules;
  startedAt: Date;
  endedAt?: Date;
  winnerId?: number;
};

export interface GameSliceState {
  currentGame?: GameData;
  lastGameResult?: GameData;
}

const initialState: GameSliceState = {
  currentGame: undefined,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame(state, action: PayloadAction<SetUpCurrentGamePayload>) {
      state.lastGameResult = undefined;
      const {player1, player2, userId, rules, gameId, startedAt, endedAt, winnerId} =
        action.payload;
      const leftPlayer = {...player1, side: 'left'} as const;
      const rightPlayer = {...player2, side: 'right'} as const;
      const me = userId === player1.profile.userId ? leftPlayer : rightPlayer;
      const opponent = userId === player1.profile.userId ? rightPlayer : leftPlayer;
      const currentPlayerWin = winnerId ? winnerId === me.profile.userId : undefined;
      state.currentGame = {
        gameId,
        ball: {x: 0.5, y: 0.5},
        me: {...me, paddlePos: 0.5},
        opponent: {...opponent, paddlePos: 0.5},
        status: 'WAIT_START',
        rules,
        startedAt,
        endedAt,
        currentPlayerWin,
      };
    },
    updateCurrentGame(
      state,
      action: PayloadAction<WsGameStateUpdatePosition.eventMessageTemplate>,
    ) {
      const {currentGame, lastGameResult} = state;
      const game = currentGame ?? lastGameResult;
      if (!game) return;
      const {player1, player2, ball, status, countdown} = action.payload;
      const {me, opponent} = game;
      game.ball.x = ball.x;
      game.ball.y = ball.y;
      game.status = status;
      game.countdown = countdown;
      me.paddlePos = (me.side === 'left' ? player1 : player2).paddlePos;
      me.score = (me.side === 'left' ? player1 : player2).score;
      opponent.paddlePos = (opponent.side === 'left' ? player1 : player2).paddlePos;
      opponent.score = (opponent.side === 'left' ? player1 : player2).score;
    },
    resetCurrentGame(state) {
      state.lastGameResult = state.currentGame;
      state.currentGame = undefined;
    },
    cleanLastGameResult(state) {
      state.lastGameResult = undefined;
    },
  },
});

export const {updateCurrentGame, setCurrentGame, resetCurrentGame, cleanLastGameResult} =
  gameSlice.actions;
export const currentGameSelector = (state: RootState) => state.game.currentGame;
export const lastGameResultSelector = (state: RootState) => state.game.lastGameResult;
export const isInGameSelector = (state: RootState) =>
  state.game?.currentGame?.status === 'IN_PROGRESS' || state.game?.currentGame?.status === 'PAUSED';
export default gameSlice.reducer;
