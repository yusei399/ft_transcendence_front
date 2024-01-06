/* Components */
import {StrictMode} from 'react';
import {Providers} from '@/lib/providers';
import {Metadata} from 'next';
import {Box, Stack} from '@chakra-ui/react';
import Sidebar from './components/SideBar';
import Navigation from './components/global/Navigation';
import Toast from './components/global/Toast';
import WebSocket from './components/global/WebSocket';

export const metadata: Metadata = {
  title: 'Transcendence',
  description: 'Last project of 42 school',
  icons: './assets/favicon.ico',
};

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <StrictMode>
      <html lang="en">
        <body>
          <Providers>
            <Stack bg="blue.700" h="100vh" w="100vw" direction={{base: 'column', lg: 'row'}}>
              <Box
                as="aside"
                bg="blue.400"
                h={{base: 'fit-content', lg: '100vh'}}
                w={{base: '100vw', lg: 'fit-content'}}
                p={{base: '20px', lg: '30px'}}>
                <Sidebar />
              </Box>
              <Box as="main" p="40px" width="100%" justifyContent="center">
                <Navigation>
                  {props.children}
                  <Toast />
                  <WebSocket />
                </Navigation>
              </Box>
            </Stack>
          </Providers>
        </body>
      </html>
    </StrictMode>
  );
}
