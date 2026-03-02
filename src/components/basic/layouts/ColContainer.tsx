import { FC } from 'react';

interface IColContainerProps {
  children: React.ReactNode;
}

const ColContainer: FC<IColContainerProps> = ({ children }) => {
  return <div className="flex flex-col gap-6">{children}</div>;
};

export default ColContainer;
