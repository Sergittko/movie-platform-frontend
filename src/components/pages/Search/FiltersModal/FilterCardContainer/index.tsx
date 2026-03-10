import { FC, ReactNode } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface IFilterCardContainerProps {
  children: ReactNode;
  label: string;
  containerClassName?: string;
}

const FilterCardContainer: FC<IFilterCardContainerProps> = ({
  children,
  label,
  containerClassName,
}) => {
  return (
    <div
      className={cn(
        'relative flex w-full flex-col gap-3 rounded-xl border border-white/10 bg-white/8 p-2',
        containerClassName,
      )}
    >
      <Label className="text-sm font-semibold text-white/80">{label}</Label>

      {children}
    </div>
  );
};

export default FilterCardContainer;
