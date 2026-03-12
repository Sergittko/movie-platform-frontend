import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'selection:bg-primary selection:text-primary-foreground file:text-foreground h-9 w-full min-w-0 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white shadow-sm backdrop-blur-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/15 hover:border-white/30 hover:bg-white/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40',
        'focus-visible:border-white/40 focus-visible:ring-[1px] focus-visible:ring-white/20',
        'aria-invalid:border-red-400 aria-invalid:ring-red-400/20',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
