import { FC } from 'react';

import { cn } from '@/lib/utils';

interface IColContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ColContainer: FC<IColContainerProps> = ({ children, className = '' }) => {
  return <div className={cn('flex flex-col gap-6', className)}>{children}</div>;
};

export default ColContainer;
