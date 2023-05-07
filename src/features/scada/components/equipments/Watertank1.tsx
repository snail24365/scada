import { ReactComponent as Watertank } from '@/assets/watertank1.svg';
import { BoxProperty } from '@/types/schema';
import { BBox, BoxEntity } from '@/types/type';
import { useEffect, useRef } from 'react';

type Watertank1Props = BoxProperty & BBox & { percentage?: number };

const Watertank1 = ({ width, height, x, y, percentage = 0 }: Watertank1Props) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const root = ref.current.querySelector('#root');
    if (!root) return;
    root.setAttribute('width', `${width}`);
    root.setAttribute('height', `${height}`);
    root.setAttribute('x', `${x}`);
    root.setAttribute('y', `${y}`);

    const text = ref.current.querySelector('#value-text');
    const tspan = text?.querySelector('tspan');
    if (tspan) tspan.innerHTML = `${Math.round(percentage)}%`;

    const water = ref.current.querySelector('#water');
    if (!water) return;
    water.setAttribute('height', `${percentage}%`);
    water.setAttribute('y', `${100 - percentage}%`);
  }, [width, height, x, y]);

  return (
    <g ref={ref}>
      <Watertank />
    </g>
  );
};

export default Watertank1;
