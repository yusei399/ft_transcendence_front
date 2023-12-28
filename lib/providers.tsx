'use client';

/* Core */
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';

/* Instruments */
import {makeStore, AppStore, AppDispatch, disconnectSocket} from './redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import Loading from '@/app/components/global/Loading';
import {useRef} from 'react';
import {SocketService} from '@/services/websocket/socketService';

export const Providers = (props: React.PropsWithChildren) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) storeRef.current = makeStore();

  const persistor = persistStore(storeRef.current, null, () => {
    const dispatch = storeRef.current?.dispatch as AppDispatch;
    if (dispatch) {
      dispatch(disconnectSocket());
      const token = storeRef.current?.getState().auth.jwt;
      if (token) SocketService.initializeSocket(dispatch, token);
    }
  });

  return (
    <Provider store={storeRef.current}>
      <ChakraProvider cssVarsRoot=":root">
        <PersistGate persistor={persistor} loading={<Loading />}>
          {props.children}
        </PersistGate>
      </ChakraProvider>
    </Provider>
  );
};
