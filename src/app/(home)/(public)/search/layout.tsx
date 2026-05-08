import { SearchFiltersProvider } from '@/providers/SearchFilersProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <title>Search</title>

      <SearchFiltersProvider>{children}</SearchFiltersProvider>
    </>
  );
};

export default Layout;
