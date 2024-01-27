'use client';

import {Flex} from '@chakra-ui/react';
import Sidebar from '../SideBar';
import Navigation from './Navigation';
import WebSocket from './WebSocket';
import {useAppSelector} from '@/lib/redux/hook';
import {isInGameSelector, isLoginSelector} from '@/lib/redux';
import Toast from './Toast';

function MainLayout(props: React.PropsWithChildren) {
  const isInGame = useAppSelector(isInGameSelector);
  const isLogin = useAppSelector(isLoginSelector);

  const showSidebar = !isInGame && isLogin;

  return (
    <Flex bg="blue.700" h="100vh" w="100vw" direction={{base: 'column', lg: 'row'}}>
      {showSidebar && (
        <Flex
          as="aside"
          bg="blue.400"
          h={{base: '100px', lg: '100vh'}}
          w={{base: '100%', lg: '160px'}}
          padding={{base: '20px', lg: '24px'}}>
          <Sidebar />
        </Flex>
      )}
      <Flex
        as="main"
        p="40px"
        maxH={showSidebar ? {base: 'calc(100vh - 120px)', lg: '100vh'} : '100vh'}
        maxW={showSidebar ? {base: '100vw', lg: 'calc(100vw - 160px)'} : '100vw'}
        padding={'20px'}
        justifyContent="center"
        alignContent="center"
        flex="1">
        <Navigation>
          {props.children}
          <Toast />
          <WebSocket />
        </Navigation>
      </Flex>
    </Flex>
  );
}

export default MainLayout;
