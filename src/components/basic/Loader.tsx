'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const loaderVariants = cva('flex items-center justify-center', {
  variants: {
    full: {
      true: 'h-screen w-full absolute top-0 left-0',
      false: '',
    },
  },
  defaultVariants: {
    full: false,
  },
});

const spinnerVariants = cva(
  'animate-spin rounded-full border-4 border-transparent border-t-white/60 h-12 w-12',
);

const textVariants = cva('text-white/80');

type LoaderProps = {
  full?: boolean;
  hideText?: boolean;
} & React.HTMLProps<HTMLDivElement> &
  VariantProps<typeof loaderVariants>;

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ full = false, hideText = false, className, ...props }, ref) => (
    <div ref={ref} className={cn(loaderVariants({ full }), className)} {...props}>
      <div className="flex flex-col items-center space-y-4">
        <div className={spinnerVariants()} />
        {!hideText && <p className={textVariants()}>Loading...</p>}
      </div>
    </div>
  ),
);

Loader.displayName = 'Loader';

export { Loader };
