/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface ChatSliceState {}

const initialState: ChatSliceState = {};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
