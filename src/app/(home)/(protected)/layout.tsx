'use client';

import { PrivateProvider } from '@/providers/PrivateProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <PrivateProvider>{children}</PrivateProvider>;
};

export default Layout;
