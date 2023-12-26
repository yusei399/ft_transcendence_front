import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import authReducer from './slices/authSlice';
import gameReducer from './slices/gameSlice';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import {backEndApi} from './api/api';
import storage from './localStorage';
import {setupListeners} from '@reduxjs/toolkit/query/react';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'game', 'user', 'chat', backEndApi.reducerPath],
};

const reducers = combineReducers({
  auth: authReducer,
  game: gameReducer,
  user: userReducer,
  chat: chatReducer,
  [backEndApi.reducerPath]: backEndApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const makeStore = () => {
  const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(backEndApi.middleware);
    },
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
