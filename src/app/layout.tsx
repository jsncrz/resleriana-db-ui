import type { Metadata } from 'next';
import './globals.css';
import { Murecho } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

import AppLayout from '@/components/layout/layout';

import { AppProvider } from './provider';

const murecho = Murecho({
  variable: '--font-murecho',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Resleriana DB',
  description: 'A Database for all Resleriana stuff related',
};

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${murecho.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <AppLayout>{children}</AppLayout>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
