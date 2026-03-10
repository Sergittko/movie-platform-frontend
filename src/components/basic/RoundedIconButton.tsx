import { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/lib/utils';

interface IRoundedIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: FC<React.SVGProps<SVGSVGElement>>;
}

export const RoundedIconButton: FC<IRoundedIconButtonProps> = ({
  icon: Icon,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex max-h-13 min-h-13 max-w-13 min-w-13 items-center justify-center rounded-full border border-white/10 bg-white/4 transition-all duration-300 hover:border-white/20 hover:bg-white/8 active:scale-98',
        className,
      )}
      {...props}
    >
      <Icon className="h-5 w-5 text-white/60 transition-colors duration-300 group-hover:text-white" />
    </button>
  );
};
