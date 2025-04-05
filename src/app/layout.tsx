import AppLayout from '@/components/layout/layout';
import type { Metadata } from 'next';
import { Murecho } from 'next/font/google';
import './globals.css';
import { AppProvider } from './provider';

const murecho = Murecho({
  variable: '--font-murecho',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Resleriana DB',
  description: 'A Database for all Resleriana stuff related',
};

const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang='en'>
      <body className={`${murecho.variable} antialiased`}>
        <AppProvider>
          <AppLayout>{children}</AppLayout>
        </AppProvider>
      </body>
    </html>
  );
};
export default RootLayout;
