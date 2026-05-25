import type { Metadata } from 'next';

import { MoviesListsEnum, moviesListTitles } from '@/constants/movies-lists';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    listType: MoviesListsEnum;
  }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { listType } = await params;

  return {
    title: listType ? moviesListTitles[listType] : 'Movies list',
  };
}

const Layout = ({ children }: LayoutProps) => {
  return children;
};

export default Layout;
