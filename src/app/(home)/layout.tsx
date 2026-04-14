'use client';

import { Provider } from 'react-redux';

import PageContainer from '@/components/basic/layouts/PageContainer';
import Footer from '@/components/layout/Footer';
import TopBar from '@/components/layout/TopBar';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { RefreshProvider } from '@/providers/RefreshProvider';
import store from '@/redux/store';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <title>Home</title>

      <Provider store={store}>
        <ReduxProvider>
          <RefreshProvider>
            <div>
              <TopBar />
              <PageContainer>{children}</PageContainer>
              <Footer />
            </div>
          </RefreshProvider>
        </ReduxProvider>
      </Provider>
    </>
  );
};

export default Layout;
