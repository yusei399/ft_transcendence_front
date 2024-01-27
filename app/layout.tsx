/* Components */
import {StrictMode} from 'react';
import {Providers} from '@/lib/providers';
import {Metadata} from 'next';
import MainLayout from './components/global/MainLayout';

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
            <MainLayout>{props.children}</MainLayout>
          </Providers>
        </body>
      </html>
    </StrictMode>
  );
}
