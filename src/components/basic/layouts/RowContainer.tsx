import { FC } from 'react';

interface IRowContainerProps {
  children: React.ReactNode;
}

const RowContainer: FC<IRowContainerProps> = ({ children }) => {
  return <div className="flex flex-row gap-6">{children}</div>;
};

export default RowContainer;
