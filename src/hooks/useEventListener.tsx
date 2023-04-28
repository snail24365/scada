import { EventType } from '@/types/eventType';
import React, { RefObject, useEffect } from 'react';

type Props = {
  listener: (e: any) => any;
  elementRef: RefObject<Element>;
  eventType: EventType;
};

const useEventListener = ({ listener, elementRef, eventType }: Props) => {
  const element = elementRef.current;

  useEffect(() => {
    element?.addEventListener(eventType, listener);
    return () => {
      element?.removeEventListener(eventType, listener);
    };
  }, []);
};

export default useEventListener;
