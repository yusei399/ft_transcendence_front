/* Components */
import {StrictMode} from 'react';
import {Providers} from '@/lib/providers';
import {Metadata} from 'next';
import {Grid, GridItem} from '@chakra-ui/react';
import Sidebar from './components/SideBar';
import Toast from './components/global/Toast';

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
            <Grid templateColumns="repeat(8, 1fr)" bg="blue.700">
              <GridItem
                as="aside"
                colSpan={{base: 8, lg: 2, xl: 1}}
                bg="blue.400"
                minHeight={{lg: '100vh'}}
                p={{base: '20px', lg: '30px'}}>
                <Sidebar />
              </GridItem>
              <GridItem as="main" colSpan={{base: 8, lg: 6, xl: 7}} minHeight='100vh' p="40px">
                {props.children}
                <Toast />
              </GridItem>
            </Grid>
          </Providers>
        </body>
      </html>
    </StrictMode>
  );
}
