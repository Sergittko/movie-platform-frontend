'use client';

import PageContainer from '@/components/basic/layouts/PageContainer';
import TopBar from '@/components/layout/TopBar';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <title>Home</title>

      <div>
        <TopBar />
        <PageContainer>{children}</PageContainer>
      </div>
    </>
  );
};

export default Layout;
