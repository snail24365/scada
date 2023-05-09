import { DomRect } from '@/types/type';
import { throwIfDev } from '@/util/util';
import { useEffect } from 'react';

const useResizeListener = (targetRef: React.RefObject<Element>, callback: (domRect: DomRect) => any) => {
  useEffect(() => {
    if (!targetRef.current) {
      return;
    }

    const target = targetRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length !== 1) return throwIfDev(`useResizeCallback: entries.length !== 1`);
      const entry = entries[0];
      callback(entry.target.getBoundingClientRect());
    });
    resizeObserver.observe(target);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
};

export default useResizeListener;
