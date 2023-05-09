import demoData from '@/assets/demo.json';
import { useEffect } from 'react';
type Props = {};

const DemoData = (props: Props) => {
  useEffect(() => {
    const visited = localStorage.getItem('isFirstAccess');
    if (visited) return;
    for (const key in demoData) {
      localStorage.setItem(key, JSON.stringify(demoData[key as keyof typeof demoData]));
    }
    localStorage.setItem('isFirstAccess', 'true');
  }, []);

  return <></>;
};

export default DemoData;
