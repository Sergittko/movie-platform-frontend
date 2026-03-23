'use client';

import PageContainer from '@/components/basic/layouts/PageContainer';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <title>Home</title>

      <div>
        <TopBar />
        <PageContainer>{children}</PageContainer>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
