import type { Metadata } from 'next';

import { MoviesListsEnum, moviesListTitles } from '@/constants/movies-lists';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    listType: string;
  }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { listType } = await params;

  const title = moviesListTitles[listType as MoviesListsEnum] ?? 'Movies list';

  return {
    title,
  };
}
const Layout = ({ children }: LayoutProps) => {
  return children;
};

export default Layout;
