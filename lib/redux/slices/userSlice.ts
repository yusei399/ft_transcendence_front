/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface UserSliceState {
  userName?: string;
  userId?: string;
}

const initialState: UserSliceState = {
  userName: undefined,
  userId: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
