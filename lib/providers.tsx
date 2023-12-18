'use client';

/* Core */
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';

/* Instruments */
import {reduxStore} from '@/lib/redux';

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <ChakraProvider cssVarsRoot=":root">{props.children}</ChakraProvider>
    </Provider>
  );
};
