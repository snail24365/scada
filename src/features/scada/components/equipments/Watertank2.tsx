import { ReactComponent as Watertank } from '@/assets/watertank2.svg';
import { BoxProperty } from '@/types/schema';
import { BBox } from '@/types/type';
import { useEffect, useRef } from 'react';

type Watertank2Props = BoxProperty & BBox & { percentage: number; value: number };

const Watertank2 = ({ width, height, x, y, percentage = 0, value = 0 }: Watertank2Props) => {
  const ref = useRef<SVGGElement>(null);
  useEffect(() => {
    if (!ref.current) return;

    const root = ref.current.querySelector('#root');
    if (!root) return;
    root.setAttribute('width', `${width}`);
    root.setAttribute('height', `${height}`);
    root.setAttribute('x', `${x}`);
    root.setAttribute('y', `${y}`);

    const text = ref.current.querySelector('#percentage tspan');
    if (!text) return;
    text.innerHTML = `${Math.round(percentage)}%`;

    const valueText = ref.current.querySelector('#value tspan');
    if (!valueText) return;
    valueText.innerHTML = `${Number(value).toFixed(2)}`;

    const gauge = ref.current.querySelector('#gauge');
    gauge?.setAttribute('height', percentage + '%');
    gauge?.setAttribute('y', 100 - percentage + '%');
  }, [width, height, x, y, percentage, value]);

  return (
    <g ref={ref}>
      <Watertank />
    </g>
  );
};

export default Watertank2;
