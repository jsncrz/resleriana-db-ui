import { ReactNode } from 'react';

import Header from './header';

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">{children}</main>
    </div>
  );
};

export default AppLayout;
