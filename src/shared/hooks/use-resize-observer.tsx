import { useLayoutEffect, useRef } from 'react';

function useResizeObserver<T extends HTMLElement>(callback: (target: T, entry: ResizeObserverEntry) => void) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === element) callback(element, entry);
      });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback]);

  return ref;
}

export default useResizeObserver;
