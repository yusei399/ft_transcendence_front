import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import {backEndApiSlice} from './api/apiSlice';

export const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    user: userReducer,
    chat: chatReducer,
    [backEndApiSlice.reducerPath]: backEndApiSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(backEndApiSlice.middleware);
  },
});

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;
