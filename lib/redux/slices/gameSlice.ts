/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {Ball, GameRules, GameStatus, Player} from '@/shared/HttpEndpoints/interfaces';

export type PlayerSide = {side: 'left' | 'right'};
export type CurrentGameData = {
  gameId: number;
  ball: Ball;
  me: Player & PlayerSide;
  opponent: Player & PlayerSide;
  status: Omit<GameStatus, 'IN_CREATION'>;
  rules: GameRules;
  countdown?: number;
};
export interface GameSliceState {
  currentGame?: CurrentGameData;
}

const initialState: GameSliceState = {
  currentGame: undefined,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame(state, action: PayloadAction<CurrentGameData>) {
      state.currentGame = action.payload;
    },
    resetCurrentGame(state) {
      state.currentGame = undefined;
    },
  },
});

export const {setCurrentGame, resetCurrentGame} = gameSlice.actions;
export const selectCurrentGame = (state: RootState) => state.game.currentGame;
export const selectCurrentGameStatus = (state: RootState) => state.game.currentGame?.status;
export default gameSlice.reducer;
