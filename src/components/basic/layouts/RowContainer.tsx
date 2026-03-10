import { FC } from 'react';

import { cn } from '@/lib/utils';

interface IRowContainerProps {
  children: React.ReactNode;
  className?: string;
}

const RowContainer: FC<IRowContainerProps> = ({ children, className }) => {
  return <div className={cn('flex flex-row gap-6', className)}>{children}</div>;
};

export default RowContainer;
