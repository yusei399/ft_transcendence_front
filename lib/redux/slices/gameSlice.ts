/* Core */
import {createSlice} from '@reduxjs/toolkit';
// import {RootState} from './store';

interface GameSliceState {}

const initialState: GameSliceState = {};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
});

export const {} = gameSlice.actions;
export default gameSlice.reducer;
