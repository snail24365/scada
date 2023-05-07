import { ReactComponent as HeatExchangerSvg } from '@/assets/heatExchanger.svg';
import { BoxProperty } from '@/types/schema';
import { BBox, Size } from '@/types/type';
import { useEffect, useRef } from 'react';

type HeatExchangerProps = BoxProperty &
  BBox & {
    speed?: number;
  } & Size;

const HeatExchanger = ({ speed = 0, ...rest }: HeatExchangerProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const rotation = ref.current?.querySelector('[data-id="rotation"]');
    if (!rotation) return;
    const duration = speed === 0 ? 0 : 10 / speed;
    rotation.setAttribute('dur', `${duration}s`);
  }, [speed]);

  return (
    <g ref={ref}>
      <HeatExchangerSvg {...rest}></HeatExchangerSvg>
    </g>
  );
};

export default HeatExchanger;
