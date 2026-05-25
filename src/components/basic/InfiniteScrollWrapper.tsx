'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';

import { Loader } from './Loader';

interface IInfiniteScrollWrapperProps {
  children: ReactNode;
  hasMore: boolean;
  isLoading?: boolean;
  onLoadMore: () => void;
  rootMargin?: number;
}

const InfiniteScrollWrapper: FC<IInfiniteScrollWrapperProps> = ({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = 0,
}) => {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        rootMargin: rootMargin + 'px',
      },
    );

    observer.observe(trigger);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, onLoadMore, rootMargin]);

  return (
    <>
      {children}
      {isLoading && <Loader hideText className="mt-6" />}
      <div ref={triggerRef} className="h-1 w-full" />
    </>
  );
};

export default InfiniteScrollWrapper;
