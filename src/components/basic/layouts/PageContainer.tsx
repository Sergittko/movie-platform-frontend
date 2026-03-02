import { FC } from 'react';

interface IPageContainerProps {
  children: React.ReactNode;
}

const PageContainer: FC<IPageContainerProps> = ({ children }) => {
  return (
    <div className="w-full pt-20 min-h-screen relative">
      <div className="p-6">{children}</div>
    </div>
  );
};

export default PageContainer;
