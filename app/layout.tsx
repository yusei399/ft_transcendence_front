/* Components */
import {StrictMode} from 'react';
import {Providers} from '@/lib/providers';
import {Metadata} from 'next';
import {Flex} from '@chakra-ui/react';
import Sidebar from './components/SideBar';
import Navigation from './components/global/Navigation';
import Toast from './components/global/Toast';
import WebSocket from './components/global/WebSocket';

export const metadata: Metadata = {
  title: 'Transcendence',
  description: 'Last project of 42 school',
  icons: './favicon.ico',
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <StrictMode>
      <html lang="en">
        <body>
          <Providers>
            <Flex bg="blue.700" h="100vh" w="100%" direction={{base: 'column', lg: 'row'}}>
              <Flex
                as="aside"
                bg="blue.400"
                h={{base: '100px', lg: '100vh'}}
                w={{base: '100%', lg: 'fit-content'}}
                p={{base: '12px', lg: '30px'}}
                padding={{base: '20px', lg: '30px'}}>
                <Sidebar />
              </Flex>
              <Flex
                as="main"
                p="40px"
                height="fit-content"
                maxH={{base: 'calc(100vh - 120px)', lg: '100vh'}}
                justifyContent="center"
                padding={'20px'}
                flex="1">
                <Navigation>
                  {props.children}
                  <Toast />
                  <WebSocket />
                </Navigation>
              </Flex>
            </Flex>
          </Providers>
        </body>
      </html>
    </StrictMode>
  );
}
