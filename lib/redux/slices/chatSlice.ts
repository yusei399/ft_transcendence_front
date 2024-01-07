/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface ChatSliceState {
  chatToRefresh?: {
    chatId: number;
    reason: 'leave' | 'join' | 'newMessage';
  };
}

const initialState: ChatSliceState = {
  chatToRefresh: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    refreshChat: (state, action: PayloadAction<ChatSliceState['chatToRefresh']>) => {
      state.chatToRefresh = action.payload;
    },
    clearChatToRefresh: state => {
      state.chatToRefresh = undefined;
    },
  },
});

export const {refreshChat, clearChatToRefresh} = chatSlice.actions;
export const chatSelector = (state: RootState) => state.chat;
export const chatToRefreshSelector = (state: RootState) => state.chat.chatToRefresh;
export default chatSlice.reducer;
