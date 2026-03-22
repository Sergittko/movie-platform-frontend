import { FC } from 'react';

interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<IPageContainerProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen w-full p-6">
      <div className="mx-auto w-full max-w-6xl flex-1 pt-20">{children}</div>
    </div>
  );
};

export default PageContainer;
