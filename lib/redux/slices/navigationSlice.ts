/* Core */
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export type NavRoutes = '/' | '/auth' | '/chat' | `/chat/${number}` | '/friend' | '/game';
export type Nav = {
  route: NavRoutes;
  params?: Record<string, string>;
  hash?: string;
  isReplace?: boolean;
};
interface NavigationSliceState {
  navigation?: Nav;
}

const initialState: NavigationSliceState = {
  navigation: undefined,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setRedirectTo: (state, action: PayloadAction<Nav>) => {
      state.navigation = action.payload;
    },
    clearRedirectTo: state => {
      state.navigation = undefined;
    },
  },
});

export const {setRedirectTo, clearRedirectTo} = navigationSlice.actions;
export const selectRedirectTo = (state: RootState) => state.navigation.navigation;
export default navigationSlice.reducer;
