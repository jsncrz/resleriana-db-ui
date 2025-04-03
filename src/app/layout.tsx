import type { Metadata } from 'next';
import { Murecho } from 'next/font/google';
import './globals.css';
import AppLayout from '@/components/layout/layout';

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
    <html lang="en">
      <body
        className={`${murecho.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
};
export default RootLayout;
