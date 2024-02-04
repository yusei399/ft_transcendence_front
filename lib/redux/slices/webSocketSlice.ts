/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export type SocketStatus = 'DISCONNECTED' | 'CONNECTED' | 'CONNECTING';
interface WebSocketSliceState {
  socketStatus: SocketStatus;
}

const initialState: WebSocketSliceState = {
  socketStatus: 'DISCONNECTED',
};

const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setSocketStatus: (state, action: PayloadAction<SocketStatus>) => {
      state.socketStatus = action.payload;
    },
  },
});

export const {setSocketStatus} = webSocketSlice.actions;
export const socketStatusSelector = (state: RootState) => state.webSocket.socketStatus;
export default webSocketSlice.reducer;
