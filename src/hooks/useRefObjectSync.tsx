import React, { useEffect } from 'react';

const useRefObjectSync = <T extends {}>(ref: React.RefObject<T>, obj: T) => {
  useEffect(() => {
    if (!ref.current) return;
    Object.assign(ref.current, obj);
  }, [obj]);
  return;
};

export default useRefObjectSync;
