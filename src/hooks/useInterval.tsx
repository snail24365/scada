import React, { useEffect } from 'react';

const useInterval = (callback: (...args: any) => any, ms?: number, dependencies?: any[]) => {
  dependencies = dependencies || [];
  let interval: number = -1;
  useEffect(() => {
    interval = window.setInterval(() => {
      callback();
    }, ms);
    return () => {
      clearInterval(interval);
    };
  }, dependencies);

  return interval;
};

export default useInterval;
