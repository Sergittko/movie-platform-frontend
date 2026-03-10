import { DependencyList, useEffect } from 'react';

const useScrollToTop = (deps: DependencyList) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, deps);
};

export default useScrollToTop;
